module "s3_temporary_uploads" {
  source  = "cloudposse/s3-bucket/aws"
  version = "0.44.0"

  acl                = "private"
  enabled            = true
  user_enabled       = false
  versioning_enabled = false
  context            = module.main_label.context
  name               = "tmp-uploads"

  cors_rule_inputs = [{
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT"]
    allowed_origins = concat(
      [
        "http://${aws_route53_record.frontend.fqdn}",
        "https://${aws_route53_record.frontend.fqdn}",
        "http://${aws_route53_record.admin.fqdn}",
        "https://${aws_route53_record.admin.fqdn}",
      ],
      var.s3_uploads_cors_additional_allowed_origins,
      var.retooljet_s3_uploads_cors_additional_allowed_origins
    )
    expose_headers  = []
    max_age_seconds = 3000
  }]

  # https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html
  lifecycle_rules = [{
    prefix  = "onboarding/"
    enabled = true
    tags    = {} # Tags must be defined and empty https://github.com/cloudposse/terraform-aws-s3-bucket/issues/87

    enable_glacier_transition            = false
    enable_deeparchive_transition        = false
    enable_standard_ia_transition        = false
    enable_current_object_expiration     = true
    enable_noncurrent_version_expiration = true

    abort_incomplete_multipart_upload_days = 1
    noncurrent_version_expiration_days     = 1

    standard_transition_days = 1
    expiration_days          = 1

    # Those need to be set although glacier and deeparchive transition is not enabled
    noncurrent_version_glacier_transition_days     = 1
    noncurrent_version_deeparchive_transition_days = 1
    glacier_transition_days                        = 1
    deeparchive_transition_days                    = 1
  }]
}

module "s3_main_app_object_storage" {
  source  = "cloudposse/s3-bucket/aws"
  version = "0.43.3"

  acl                = "private"
  enabled            = true
  user_enabled       = false
  versioning_enabled = false
  context            = module.main_label.context
  name               = "main_storage"
}

data "aws_iam_policy_document" "backend_s3" {
  statement {
    actions = [
      "s3:GetObject", "s3:ListBucket", "s3:GetBucketLocation", "s3:PutObject", "s3:DeleteObject"
    ]
    resources = [
      module.s3_temporary_uploads.bucket_arn, "${module.s3_temporary_uploads.bucket_arn}/*",
      module.s3_main_app_object_storage.bucket_arn, "${module.s3_main_app_object_storage.bucket_arn}/*",
    ]
    effect = "Allow"
  }
}

module "ecs_backend_s3_access_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.24.0"

  context = module.ecs_backend_label.context

  attributes = ["ecs", "s3_access"]
}

resource "aws_iam_policy" "backend_s3" {
  name   = module.ecs_backend_s3_access_label.id
  policy = data.aws_iam_policy_document.backend_s3.json
}
