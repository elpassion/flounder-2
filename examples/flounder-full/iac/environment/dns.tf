resource "aws_route53_zone" "internal" {
  name = "${var.stage}.${var.internal_tld}"
  vpc {
    vpc_id = module.vpc.vpc_id
  }
  tags = module.main_label.tags
}

data "aws_route53_zone" "external_parent" {
  name = var.external_dns_zone_parent_name
}

resource "aws_route53_zone" "external" {
  name = local.external_dns_zone_name
}

resource "aws_route53_record" "external_zone_ns" {
  name    = aws_route53_zone.external.name
  type    = "NS"
  zone_id = data.aws_route53_zone.external_parent.id

  ttl     = 300
  records = aws_route53_zone.external.name_servers
}

data "aws_iam_policy_document" "eks_route53_access" {
  statement {
    effect  = "Allow"
    actions = ["route53:ChangeResourceRecordSets"]
    resources = [
      "arn:aws:route53:::hostedzone/${aws_route53_zone.external.id}"
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "route53:ListHostedZones",
      "route53:ListResourceRecordSets",
    ]
    resources = ["*"]
  }
}

module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> v2.0"

  domain_name               = "*.${aws_route53_zone.external.name}"
  zone_id                   = aws_route53_zone.external.id
  subject_alternative_names = [aws_route53_zone.external.name]

  tags = {
    Name      = "wildcard_${aws_route53_zone.external.name}"
    Terraform = true
  }

  depends_on = [aws_route53_record.external_zone_ns]
}
