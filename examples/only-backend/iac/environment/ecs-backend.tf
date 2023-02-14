module "ecs_backend_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.ecs_label.context

  attributes = ["backend"]
}

locals {
  backend_fqdn            = "api.${aws_route53_zone.external.name}"
  backend_container_image = "${data.aws_ecr_repository.backend.repository_url}:${data.aws_ecr_image.backend.image_tag}"
  _backend_container_environment_from_terraform = {
    "LOG_LEVEL"                         = "info"
    "API_ALLOWED_ORIGINS"               = ""
    "API_URL"                           = "https://${local.backend_fqdn}"
  }
  _backend_container_environment = merge(
    local._backend_container_environment_from_terraform,
    var.backend_all_stages_env_vars,
    var.backend_stage_specific_env_vars
  )
  backend_container_environment = [
    for k, v in local._backend_container_environment :
    {
      name  = k
      value = tostring(v)
    }
  ]
  backend_container_secrets = [
    {
      name = "FLOAT_TOKEN"
      valueFrom = module.float_token_secret.secret_arn
    },
    {
      name = "CALAMARI_API_KEY"
      valueFrom = module.calamari_api_key_secret.secret_arn
    },
  ]
}

data "aws_ecr_repository" "backend" {
  name = data.terraform_remote_state.common.outputs.ecr_repo_names["backend"]
}

data "aws_ecr_image" "backend" {
  repository_name = data.aws_ecr_repository.backend.name
  image_tag       = var.ecs_config["backend"].image_tag
}

module "backend_ecs" {
  source  = "cloudposse/ecs-web-app/aws"
  version = "0.62.0"

  context                                         = module.ecs_backend_label.context
  launch_type                                     = "FARGATE"
  vpc_id                                          = module.vpc.vpc_id
  alb_ingress_unauthenticated_listener_arns       = [module.external_alb.https_listener_arn]
  alb_ingress_unauthenticated_listener_arns_count = 1
  alb_ingress_authenticated_hosts                 = [local.backend_fqdn]
  alb_ingress_unauthenticated_hosts               = [local.backend_fqdn]
  container_port                                  = 8000
  port_mappings = [
    {
      containerPort = 8000
      hostPort      = 8000
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

  container_environment = local.backend_container_environment

  secrets = local.backend_container_secrets

  alb_security_group = module.external_alb_sg.security_group_id

  use_ecr_image        = false
  container_image      = local.backend_container_image
  force_new_deployment = true

  task_cpu    = var.ecs_config["backend"].task_cpu
  task_memory = var.ecs_config["backend"].task_memory
}

resource "aws_route53_record" "backend" {
  name    = local.backend_fqdn
  type    = "A"
  zone_id = aws_route53_zone.external.id
  alias {
    evaluate_target_health = false
    name                   = module.external_alb.alb_dns_name
    zone_id                = module.external_alb.alb_zone_id
  }
}

resource "aws_cloudwatch_log_metric_filter" "backend_500" {
  name           = var.metric_filter_name
  pattern        = "[type, method, url, responseStatus=5*, responseTime, InBody, OutBody]"
  log_group_name = module.backend_ecs.cloudwatch_log_group_name

  metric_transformation {
    name      = var.metric_filter_name
    namespace = var.namespace
    value     = "1"
  }
}

module "float_token_secret" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage = var.stage
  name = "float_token_secret"
  tags = local.additional_tags

  secret_string = "example"
}

resource "aws_iam_role_policy_attachment" "backend_float_token_secret" {
  policy_arn = module.float_token_secret.iam_policy_arn_read_secret
  role = module.backend_ecs.ecs_task_exec_role_name
}

module "calamari_api_key_secret" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage = var.stage
  name = "calamari_api_key_secret"
  tags = local.additional_tags

  secret_string = "example"
}

resource "aws_iam_role_policy_attachment" "backend_calamari_api_key_secret" {
  policy_arn = module.calamari_api_key_secret.iam_policy_arn_read_secret
  role = module.backend_ecs.ecs_task_exec_role_name
}
