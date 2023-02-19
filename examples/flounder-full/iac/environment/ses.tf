module "notifications_ses_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name       = "notifications"
  attributes = ["notifications", "ses"]
}

module "notifications_ses" {
  source  = "cloudposse/ses/aws"
  version = "0.20.6"

  context = module.notifications_ses_label.context

  domain        = local.frontend_fqdn
  zone_id       = aws_route53_zone.external.zone_id
  verify_domain = true
  verify_dkim   = true

  ses_group_enabled = false
  ses_user_enabled  = false
}

data "aws_iam_policy_document" "notifications_ses" {
  statement {
    effect = "Allow"
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
      "ses:SendTemplatedEmail",
      "ses:SendBulkTemplatedEmail"
    ]


    resources = [module.notifications_ses.ses_domain_identity_arn]
  }
}

module "ecs_notifications_ses_access_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.24.0"

  context = module.ecs_backend_label.context

  attributes = ["ecs", "ses-access"]
}

resource "aws_iam_policy" "backend_notifications_ses" {
  name   = module.ecs_notifications_ses_access_label.id
  policy = data.aws_iam_policy_document.notifications_ses.json
}
