data "aws_iam_role" "ecr_readonly_access" {
  for_each = toset(var.roles_with_readonly_access)
  name     = each.value
}

module "ecr" {
  for_each = toset(var.ecr_repositories)

  source               = "cloudposse/ecr/aws"
  version              = "~> 0.32.0"
  namespace            = var.namespace
  stage                = var.stage
  name                 = var.name
  attributes           = [each.key]
  image_tag_mutability = "MUTABLE"
  encryption_configuration = {
    encryption_type = "KMS"
    kms_key         = module.kms_key.key_arn
  }
  tags = local.additional_tags

  principals_readonly_access = [for role in data.aws_iam_role.ecr_readonly_access : role.arn]
  principals_full_access     = []
}
