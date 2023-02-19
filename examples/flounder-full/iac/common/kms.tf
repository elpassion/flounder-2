module "kms_key" {
  source                  = "cloudposse/kms-key/aws"
  version                 = "0.10.0"
  namespace               = var.namespace
  stage                   = var.stage
  name                    = "ecr"
  description             = "KMS key for ${var.namespace} ECR"
  deletion_window_in_days = 10
  enable_key_rotation     = true
  alias                   = "alias/${var.namespace}-${var.stage}"
  tags                    = local.additional_tags
}

output "kms_key_id" {
  value = module.kms_key.key_id
}

output "kms_key_alias_name" {
  value = module.kms_key.alias_name
}
