module "access_to_db_sg_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  stage     = module.main_label.stage
  namespace = module.main_label.namespace
  name      = "dbaccess"

  tags = local.additional_tags
}

module "access_to_db_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.2.0"

  name   = module.access_to_db_sg_label.id
  tags   = module.access_to_db_sg_label.tags
  vpc_id = module.vpc.vpc_id

  egress_rules       = ["postgresql-tcp"]
  egress_cidr_blocks = module.vpc.database_subnets_cidr_blocks
}

module "db_sg_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  stage     = module.main_label.stage
  namespace = module.main_label.namespace
  name      = "db"

  tags = local.additional_tags
}

module "db_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.2.0"
  name    = module.db_sg_label.id
  tags    = module.db_sg_label.tags
  vpc_id  = module.vpc.vpc_id

  computed_ingress_with_source_security_group_id = [
    {
      rule                     = "postgresql-tcp"
      source_security_group_id = module.access_to_db_sg.security_group_id
    }
  ]
  number_of_computed_ingress_with_source_security_group_id = 1
}

module "db_password_secret" {
  source = "git@github.com:elpassion/terraform-aws-secrets-manager-secret.git?ref=0.1.1"

  namespace = var.namespace
  stage     = var.stage
  name      = "db_password"
  tags      = local.additional_tags

  secret_string = "postgresql://${var.db_username}:${random_password.rds_password.result}@${module.db.db_instance_address}:${module.db.db_instance_port}/${var.db_database_name}"
}

resource "aws_iam_role_policy_attachment" "backend_db_secret" {
  policy_arn = module.db_password_secret.iam_policy_arn_read_secret
  role       = module.backend_ecs.ecs_task_exec_role_name
}


module "db_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  context = module.main_label.context
}

locals {
  db_tags = var.stage == "prod" ? merge(module.db_label.tags, { workload-type = "production" }) : module.db_label.tags
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0.0"

  allocated_storage           = var.db_storage
  backup_window               = var.db_backup_window
  maintenance_window          = var.db_maintenance_window
  engine                      = "postgres"
  engine_version              = var.db_postgres_version
  family                      = var.db_parameter_group_family
  identifier                  = module.db_label.id
  instance_class              = var.db_instance_class
  port                        = "5432"
  username                    = var.db_username
  create_db_subnet_group      = false
  db_subnet_group_name        = module.vpc.database_subnet_group_name
  multi_az                    = var.db_multi_az
  backup_retention_period     = var.db_backup_retention_period
  allow_major_version_upgrade = var.db_allow_major_version_upgrade
  apply_immediately           = var.db_apply_immediately
  name                        = var.db_database_name
  deletion_protection         = var.db_deletion_protection
  iops                        = var.db_iops
  kms_key_id                  = module.kms_key.key_arn
  storage_encrypted           = true
  tags                        = local.db_tags
  password                    = random_password.rds_password.result
  vpc_security_group_ids      = [module.db_sg.security_group_id]
}

resource "random_password" "rds_password" {
  length  = 40
  special = false
}

resource "aws_route53_record" "db_endpoint" {
  name    = "db"
  type    = "CNAME"
  zone_id = aws_route53_zone.internal.id

  ttl = 300
  records = [
    module.db.db_instance_address,
  ]
}