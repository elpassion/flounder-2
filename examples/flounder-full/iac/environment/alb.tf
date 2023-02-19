module "external_alb_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "alb"
}

module "external_alb_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.2.0"

  name   = module.external_alb_label.id
  vpc_id = module.vpc.vpc_id

  ingress_rules       = ["http-80-tcp", "https-443-tcp"]
  ingress_cidr_blocks = ["0.0.0.0/0"]

  tags = module.external_alb_label.tags
}

module "external_alb" {
  source  = "cloudposse/alb/aws"
  version = "0.33.1"
  context = module.external_alb_label.context

  vpc_id                                  = module.vpc.vpc_id
  security_group_ids                      = [module.external_alb_sg.security_group_id]
  subnet_ids                              = module.vpc.public_subnets
  internal                                = false
  http_enabled                            = true
  https_enabled                           = true
  certificate_arn                         = module.acm.this_acm_certificate_arn
  http_redirect                           = true
  access_logs_enabled                     = true
  alb_access_logs_s3_bucket_force_destroy = var.stage == "prod" ? false : true
  deletion_protection_enabled             = var.stage == "prod" ? true : false
}