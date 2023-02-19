provider "aws" {
  region = var.region
}

data "aws_caller_identity" "this" {}

data "aws_iam_user" "users_with_state_access" {
  for_each  = toset(var.users_with_state_access)
  user_name = each.key
}

data "aws_iam_role" "roles_with_state_access" {
  for_each = toset(var.roles_with_state_access)
  name     = each.key
}

locals {
  user_ids_with_state_access          = [for k, v in data.aws_iam_user.users_with_state_access : v.id]
  role_ids_with_state_access          = [for k, v in data.aws_iam_role.roles_with_state_access : v.unique_id]
  role_ids_with_state_access_wildcard = [for k, v in data.aws_iam_role.roles_with_state_access : "${v.unique_id}:*"]
  ids_with_state_access = flatten([
    [data.aws_caller_identity.this.account_id], # root account
    local.user_ids_with_state_access,
    local.role_ids_with_state_access,
    local.role_ids_with_state_access_wildcard,
  ])
}

data "aws_iam_policy_document" "tfstate-bucket-policy" {
  statement {
    effect = "Deny"
    actions = [
      "s3:*",
    ]
    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
    condition {
      test     = "StringNotLike"
      values   = local.ids_with_state_access
      variable = "aws:userId"
    }

    resources = [
      "arn:aws:s3:::${module.label.id}",
      "arn:aws:s3:::${module.label.id}/*",
    ]
  }
}


resource "aws_s3_bucket" "tfstate" {
  bucket = module.label.id
  policy = data.aws_iam_policy_document.tfstate-bucket-policy.json

  tags = module.label.tags

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "aws:kms"
        kms_master_key_id = module.kms_key.key_id
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.bucket

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "tfstate_bucket" {
  value = aws_s3_bucket.tfstate.bucket
}
output "tfstate_bucket_arn" {
  value = aws_s3_bucket.tfstate.arn
}
