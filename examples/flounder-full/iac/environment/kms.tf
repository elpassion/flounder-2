module "kms_key" {
  source                  = "cloudposse/kms-key/aws"
  version                 = "0.10.0"
  context                 = module.main_label.context
  name                    = "kms"
  description             = "KMS key for ${var.namespace}-${var.stage}environment"
  deletion_window_in_days = 10
  enable_key_rotation     = true
  alias                   = "alias/${var.namespace}-${var.stage}-xxx"
}

output "kms_key_id" {
  value = module.kms_key.key_id
}

output "kms_key_alias_name" {
  value = module.kms_key.alias_name
}
