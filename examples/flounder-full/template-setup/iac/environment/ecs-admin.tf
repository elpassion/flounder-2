module "ecs_admin_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.ecs_label.context

  attributes = ["admin"]
}

locals {
  admin_fqdn            = "admin.${aws_route53_zone.external.name}"
  admin_container_image = "${data.aws_ecr_repository.admin.repository_url}:${data.aws_ecr_image.admin.image_tag}"
  _admin_container_environment_from_terraform = {
    "LOG_LEVEL"                       = "info"
    "API_URL"                         = "https://${local.backend_fqdn}"
    "PAGE_URL"                        = "https://${local.admin_fqdn}"
    "NEXTAUTH_SECRET"                 = random_password.nextauth_secret.result
    "NEXTAUTH_URL"                    = "https://${local.admin_fqdn}"
    "COGNITO_CLIENT_ID"               = aws_cognito_user_pool_client.public_api_client_without_secret.id
    "COGNITO_ISSUER"                  = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.public_api_pool.id}"
    "COGNITO_URL"                     = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com"
    "COGNITO_REGION"                  = var.region
    "COGNITO_USER_POOL_ID"            = aws_cognito_user_pool.public_api_pool.id
    "COGNITO_USER_POOL_WEB_CLIENT_ID" = aws_cognito_user_pool_client.public_api_client_without_secret.id
    "COGNITO_OAUTH_REDIRECT_SIGNIN"   = "https://${local.admin_fqdn}"
    "COGNITO_OAUTH_REDIRECT_SIGNOUT"  = "https://${local.admin_fqdn}"
    "COGNITO_OAUTH_DOMAIN"            = "${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com"
  }
  _admin_container_environment = merge(
    local._admin_container_environment_from_terraform,
    var.admin_all_stages_env_vars,
    var.admin_stage_specific_env_vars
  )
  admin_container_environment = [
    for k, v in local._admin_container_environment :
    {
      name  = k
      value = tostring(v)
    }
  ]
  admin_container_secrets = [
    {
      name      = "COGNITO_CLIENT_SECRET"
      valueFrom = module.cognito_client_secret.secret_arn
    }
  ]
}

data "aws_ecr_repository" "admin" {
  name = data.terraform_remote_state.common.outputs.ecr_repo_names["admin"]
}

data "aws_ecr_image" "admin" {
  repository_name = data.aws_ecr_repository.admin.name
  image_tag       = var.ecs_config["admin"].image_tag
}

module "admin_ecs" {
  source  = "cloudposse/ecs-web-app/aws"
  version = "0.62.0"

  context                                         = module.ecs_admin_label.context
  launch_type                                     = "FARGATE"
  vpc_id                                          = module.vpc.vpc_id
  alb_ingress_unauthenticated_listener_arns       = [module.external_alb.https_listener_arn]
  alb_ingress_unauthenticated_listener_arns_count = 1
  alb_ingress_listener_unauthenticated_priority   = 1001
  alb_ingress_authenticated_hosts                 = [local.admin_fqdn]
  alb_ingress_unauthenticated_hosts               = [local.admin_fqdn]
  container_port                                  = 3002
  port_mappings = [
    {
      containerPort = 3002
      hostPort      = 3002
      protocol      = "tcp"
    }
  ]
  aws_logs_region              = var.region
  cloudwatch_log_group_enabled = true
  ecs_cluster_arn              = aws_ecs_cluster.this.arn
  ecs_cluster_name             = aws_ecs_cluster.this.name
  ecs_security_group_ids = [
    module.ecs_sg.security_group_id,
  module.access_to_db_sg.security_group_id]
  ecs_private_subnet_ids            = module.vpc.private_subnets
  alb_ingress_healthcheck_path      = "/"
  alb_ingress_unauthenticated_paths = ["/*"]
  codepipeline_enabled              = false

  container_environment = local.admin_container_environment

  secrets = local.admin_container_secrets

  alb_security_group = module.external_alb_sg.security_group_id

  use_ecr_image        = false
  container_image      = local.admin_container_image
  force_new_deployment = true

  task_cpu    = var.ecs_config["admin"].task_cpu
  task_memory = var.ecs_config["admin"].task_memory
}

resource "aws_route53_record" "admin" {
  name    = local.admin_fqdn
  type    = "A"
  zone_id = aws_route53_zone.external.id
  alias {
    evaluate_target_health = false
    name                   = module.external_alb.alb_dns_name
    zone_id                = module.external_alb.alb_zone_id
  }
}

resource "aws_iam_role_policy_attachment" "admin_cognito_client_secret" {
  policy_arn = module.cognito_client_secret.iam_policy_arn_read_secret
  role       = module.admin_ecs.ecs_task_exec_role_name
}
