module "retooljet_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "retooljet"
}

resource "aws_iam_user" "retooljet" {
  name = module.retooljet_label.id
  tags = module.retooljet_label.tags
}

data "aws_iam_policy_document" "retooljet" {
  statement {
    effect    = "Allow"
    actions   = ["s3:*"]
    resources = ["${module.s3_temporary_uploads.bucket_arn}/*", module.s3_temporary_uploads.bucket_arn]
  }
}

resource "aws_iam_user_policy" "retooljet" {
  policy = data.aws_iam_policy_document.retooljet.json
  user   = aws_iam_user.retooljet.name
}
