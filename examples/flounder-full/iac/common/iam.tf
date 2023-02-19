module "iam_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  context    = module.label.context
  attributes = ["CI-access"]
}

data "aws_iam_policy_document" "ci_access" {
  statement {
    sid    = "ECRLogin"
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = ["*"]
  }

  statement {
    sid    = "ECRAccess"
    effect = "Allow"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeRepositories",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetLifecyclePolicy",
      "ecr:GetLifecyclePolicyPreview",
      "ecr:GetRepositoryPolicy",
      "ecr:InitiateLayerUpload",
      "ecr:ListTagsForResource",
      "ecr:PutImage",
      "ecr:PutLifecyclePolicy",
      "ecr:TagResource",
      "ecr:UploadLayerPart",
    ]
    resources = values(module.ecr)[*].repository_arn
  }

  statement {
    sid    = "ECSStarActions"
    effect = "Allow"
    actions = [
      "ecs:DescribeTaskDefinition",
      "ecs:RegisterTaskDefinition",
    ]
    resources = [
      "*",
    ]
  }

  statement {
    sid    = "ECSUpdateService"
    effect = "Allow"
    actions = [
      "ecs:UpdateService",
    ]
    resources = [
      "arn:aws:ecs:${var.region}:${data.aws_caller_identity.this.account_id}:service/${var.namespace}-*",
    ]
  }

  statement {
    sid    = "IAM"
    effect = "Allow"
    actions = [
      "iam:PassRole",
    ]
    resources = [
      "arn:aws:iam::${data.aws_caller_identity.this.account_id}:role/${var.namespace}-*-exec",
      "arn:aws:iam::${data.aws_caller_identity.this.account_id}:role/${var.namespace}-*-task",
    ]
  }
}

resource "aws_iam_policy" "ci_access" {
  name   = module.iam_label.id
  policy = data.aws_iam_policy_document.ci_access.json
  tags   = module.label.tags
}

resource "aws_iam_user" "ci_access" {
  name = module.iam_label.id
  tags = module.iam_label.tags
}

resource "aws_iam_user_policy_attachment" "ci_access" {
  policy_arn = aws_iam_policy.ci_access.arn
  user       = aws_iam_user.ci_access.name
}

resource "aws_iam_access_key" "ci_access" {
  user = aws_iam_user.ci_access.name
}

output "ci_access_key_id" {
  value = aws_iam_access_key.ci_access.id
}

output "ci_secret_access_key" {
  value     = aws_iam_access_key.ci_access.secret
  sensitive = true
}
