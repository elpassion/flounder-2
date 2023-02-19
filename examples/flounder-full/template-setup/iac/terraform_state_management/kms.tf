module "kms_key" {
  source                  = "cloudposse/kms-key/aws"
  version                 = "0.10.0"
  namespace               = var.namespace
  stage                   = var.stage
  name                    = var.name
  deletion_window_in_days = 10
  enable_key_rotation     = true
  alias                   = "alias/${module.label.id}"
  tags                    = local.additional_tags
}

output "main_kms_key_id" {
  value = module.kms_key.key_id
}

output "main_kms_key_alias_name" {
  value = module.kms_key.alias_name
}
