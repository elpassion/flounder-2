module "ecs_frontend_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  context    = module.ecs_label.context
  attributes = ["frontend"]
}

locals {
  frontend_fqdn            = aws_route53_zone.external.name
  frontend_container_image = "${data.aws_ecr_repository.frontend.repository_url}:${data.aws_ecr_image.frontend.image_tag}"
  _frontend_container_environment_from_terraform = {
    "LOG_LEVEL"                       = "info"
    "API_URL"                         = "https://${local.backend_fqdn}"
    "PAGE_URL"                        = "https://${local.frontend_fqdn}"
    "NEXTAUTH_SECRET"                 = random_password.nextauth_secret.result
    "NEXTAUTH_URL"                    = "https://${local.frontend_fqdn}"
    "COGNITO_CLIENT_ID"               = aws_cognito_user_pool_client.public_api_client_without_secret.id
    "COGNITO_ISSUER"                  = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.public_api_pool.id}"
    "COGNITO_URL"                     = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com"
    "COGNITO_REGION"                  = var.region
    "COGNITO_USER_POOL_ID"            = aws_cognito_user_pool.public_api_pool.id
    "COGNITO_USER_POOL_WEB_CLIENT_ID" = aws_cognito_user_pool_client.public_api_client_without_secret.id
    "COGNITO_OAUTH_REDIRECT_SIGNIN"   = "https://${local.frontend_fqdn}"
    "COGNITO_OAUTH_REDIRECT_SIGNOUT"  = "https://${local.frontend_fqdn}"
    "COGNITO_OAUTH_DOMAIN"            = "${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com"
    "STRIPE_SUCCESS_PAYMENT_URL"      = "https://${local.frontend_fqdn}/?success=true"
    "STRIPE_CANCELLED_PAYMENT_URL"    = "https://${local.frontend_fqdn}/?cancelled=true"
  }

  _frontend_container_environment = merge(
    local._frontend_container_environment_from_terraform,
    var.frontend_all_stages_env_vars,
    var.frontend_stage_specific_env_vars
  )
  frontend_container_environment = [
    for k, v in local._frontend_container_environment :
    {
      name  = k
      value = tostring(v)
    }
  ]
  frontend_container_secrets = [
    {
      name      = "COGNITO_CLIENT_SECRET"
      valueFrom = module.cognito_client_secret.secret_arn
    },
    {
      name      = "STRIPE_SECRET_KEY"
      valueFrom = module.stripe_secret_key.secret_arn
    },
      {
      name      = "STRIPE_WEBHOOK_SIGNING_SECRET"
      valueFrom = module.stripe_webhook_signing_secret.secret_arn
    },
       {
      name      = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
      valueFrom = module.next_public_stripe_publishable_key.secret_arn
    },
  ]
}


data "aws_ecr_repository" "frontend" {
  name = data.terraform_remote_state.common.outputs.ecr_repo_names["frontend"]
}

data "aws_ecr_image" "frontend" {
  repository_name = data.aws_ecr_repository.frontend.name
  image_tag       = var.ecs_config["frontend"].image_tag
}

module "frontend_ecs" {
  source  = "cloudposse/ecs-web-app/aws"
  version = "0.62.0"

  context                                         = module.ecs_frontend_label.context
  launch_type                                     = "FARGATE"
  vpc_id                                          = module.vpc.vpc_id
  alb_ingress_unauthenticated_listener_arns       = [module.external_alb.https_listener_arn]
  alb_ingress_unauthenticated_listener_arns_count = 1
  alb_ingress_listener_authenticated_priority     = 999
  alb_ingress_listener_unauthenticated_priority   = 999
  alb_ingress_authenticated_hosts                 = [local.frontend_fqdn]
  alb_ingress_unauthenticated_hosts               = [local.frontend_fqdn]
  container_port                                  = 3000
  port_mappings = [
    {
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }
  ]
  aws_logs_region              = var.region
  cloudwatch_log_group_enabled = true
  ecs_cluster_arn              = aws_ecs_cluster.this.arn
  ecs_cluster_name             = aws_ecs_cluster.this.name
  ecs_security_group_ids = [
  module.ecs_sg.security_group_id]
  ecs_private_subnet_ids            = module.vpc.private_subnets
  alb_ingress_healthcheck_path      = "/api/ping"
  alb_ingress_unauthenticated_paths = ["/*"]
  codepipeline_enabled              = false

  container_environment = local.frontend_container_environment

  secrets = local.frontend_container_secrets

  alb_security_group = module.external_alb_sg.security_group_id

  use_ecr_image        = false
  container_image      = local.frontend_container_image
  force_new_deployment = true

  task_cpu    = var.ecs_config["frontend"].task_cpu
  task_memory = var.ecs_config["frontend"].task_memory
}

resource "aws_route53_record" "frontend" {
  name    = local.frontend_fqdn
  type    = "A"
  zone_id = aws_route53_zone.external.id
  alias {
    evaluate_target_health = false
    name                   = module.external_alb.alb_dns_name
    zone_id                = module.external_alb.alb_zone_id
  }
}

resource "random_password" "nextauth_secret" {
  length  = 40
  special = false
}

resource "aws_iam_role_policy_attachment" "frontend_cognito_client_secret" {
  policy_arn = module.cognito_client_secret.iam_policy_arn_read_secret
  role       = module.frontend_ecs.ecs_task_exec_role_name
}

module "stripe_secret_key" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage     = var.stage
  name      = "stripe_secret_key"
  tags      = local.additional_tags

  secret_string = "CHANGE_THIS"
}

resource "aws_iam_role_policy_attachment" "stripe_api_secret" {
  policy_arn = module.stripe_secret_key.iam_policy_arn_read_secret
  role       = module.frontend_ecs.ecs_task_exec_role_name
}

module "stripe_webhook_signing_secret" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage     = var.stage
  name      = "stripe_webhook_signing_secret"
  tags      = local.additional_tags

  secret_string = "CHANGE_THIS"
}

resource "aws_iam_role_policy_attachment" "stripe_webhook_signing_secret" {
  policy_arn = module.stripe_webhook_signing_secret.iam_policy_arn_read_secret
  role       = module.frontend_ecs.ecs_task_exec_role_name
}

module "next_public_stripe_publishable_key" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage     = var.stage
  name      = "next_public_stripe_publishable_key"
  tags      = local.additional_tags

  secret_string = "CHANGE_THIS"
}

resource "aws_iam_role_policy_attachment" "next_public_stripe_publishable_key" {
  policy_arn = module.next_public_stripe_publishable_key.iam_policy_arn_read_secret
  role       = module.frontend_ecs.ecs_task_exec_role_name
}