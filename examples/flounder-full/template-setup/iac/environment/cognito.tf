module "public_api_user_pool_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "public-user-pool"
}

resource "aws_cognito_user_pool" "public_api_pool" {
  name = module.public_api_user_pool_label.id
  tags = module.public_api_user_pool_label.tags

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  username_configuration {
    case_sensitive = false
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    mutable             = true
    required            = false
    string_attribute_constraints {
      max_length = 2048
      min_length = 0
    }
  }

  password_policy {
    minimum_length    = 6
    require_lowercase = true
    require_numbers   = true
    require_uppercase = true

    temporary_password_validity_days = 7
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  #  lambda_config {
  #    pre_authentication = module.lambda_blocked_user.lambda_function_arn
  #  }

}

module "public_api_user_pool_client_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "public-user-pool-client"
}

module "public_api_user_pool_client_without_secret_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "public-user-pool-client-without-secret"
}

resource "aws_cognito_user_pool_client" "public_api_client" {
  name                = module.public_api_user_pool_client_label.id
  user_pool_id        = aws_cognito_user_pool.public_api_pool.id
  explicit_auth_flows = ["ADMIN_NO_SRP_AUTH", "USER_PASSWORD_AUTH"]
  callback_urls = concat(
    var.cognito_callback_urls,
    [
      "https://${local.frontend_fqdn}/api/auth/callback/cognito",
      "https://${local.backend_fqdn}/swagger/oauth2-redirect.html",
      "https://${local.admin_fqdn}/api/auth/callback/cognito",
      "${var.namespace}auth://auth/callback/cognito/login",
    ]
  )
  logout_urls = concat(
    var.cognito_logout_urls,
    [
      "https://${local.frontend_fqdn}",
      "https://${local.admin_fqdn}",
      "${var.namespace}auth://auth/callback/cognito/logout",
    ]
  )
  supported_identity_providers         = ["COGNITO", aws_cognito_identity_provider.google_provider.provider_name, aws_cognito_identity_provider.facebook_provider.provider_name]
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true
  generate_secret                      = true
}

resource "aws_cognito_user_pool_client" "public_api_client_without_secret" {
  name                = module.public_api_user_pool_client_without_secret_label.id
  user_pool_id        = aws_cognito_user_pool.public_api_pool.id
  explicit_auth_flows = ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_USER_PASSWORD_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", ]
  callback_urls = concat(
    var.cognito_callback_urls_without_secret,
    [
      "https://${local.backend_fqdn}/swagger/oauth2-redirect.html",
      "https://${local.backend_fqdn}/swagger/oauth2/idpresponse",
      "https://${local.admin_fqdn}/api/auth/callback/cognito",
      "https://${local.frontend_fqdn}",
      "https://${local.admin_fqdn}",
      "${var.namespace}auth://auth/callback/cognito/login",
    ]
  )
  logout_urls = concat(
    var.cognito_logout_urls,
    [
      "https://${local.frontend_fqdn}",
      "https://${local.admin_fqdn}",
      "${var.namespace}auth://auth/callback/cognito/logout",
    ]
  )
  supported_identity_providers         = ["COGNITO", aws_cognito_identity_provider.google_provider.provider_name, aws_cognito_identity_provider.facebook_provider.provider_name]
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid", "profile", "aws.cognito.signin.user.admin"]
  allowed_oauth_flows_user_pool_client = true
  generate_secret                      = false
}

resource "aws_cognito_identity_provider" "google_provider" {
  user_pool_id  = aws_cognito_user_pool.public_api_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "profile email openid"
    client_id        = "change me"
    client_secret    = "change me"
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
    name     = "name"
    picture  = "picture"
  }

  lifecycle {
    ignore_changes = [provider_details]
  }
}
resource "aws_cognito_identity_provider" "facebook_provider" {
  user_pool_id  = aws_cognito_user_pool.public_api_pool.id
  provider_name = "Facebook"
  provider_type = "Facebook"

  provider_details = {
    authorize_scopes = "email,public_profile"
    authorize_scopes = "email"
    client_id        = "change me"
    client_secret    = "change me"
  }

  attribute_mapping = {
    email    = "email"
    username = "id"
    name     = "name"
    picture  = "picture"
  }

  lifecycle {
    ignore_changes = [provider_details]
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = var.cognito_user_pool_domain
  user_pool_id = aws_cognito_user_pool.public_api_pool.id
}

data "aws_iam_policy_document" "public_api_pool" {
  statement {
    effect = "Allow"
    actions = [
      "cognito-idp:*"
    ]
    resources = [
      aws_cognito_user_pool.public_api_pool.arn
    ]
  }
}

resource "aws_iam_policy" "public_api_pool" {
  name   = module.public_api_user_pool_label.id
  policy = data.aws_iam_policy_document.public_api_pool.json
}
resource "aws_cognito_user_group" "user" {
  name         = "user-group"
  user_pool_id = aws_cognito_user_pool.public_api_pool.id
  description  = "User group"
}

resource "aws_cognito_user_group" "admin" {
  name         = "admin-group"
  user_pool_id = aws_cognito_user_pool.public_api_pool.id
  description  = "Admin group"
}

resource "aws_cognito_user_pool_ui_customization" "public_ui_customization" {
  client_id = aws_cognito_user_pool_client.public_api_client.id

  css        = file("cognito.css")
  image_file = filebase64("cognito-logo.jpg")

  user_pool_id = aws_cognito_user_pool_domain.main.user_pool_id
}

module "cognito_client_secret" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage     = var.stage
  name      = "cognito-client-secret"
  tags      = local.additional_tags

  secret_string = resource.aws_cognito_user_pool_client.public_api_client.client_secret
}
