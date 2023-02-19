provider "aws" {
  region = var.region
}

locals {

  additional_tags0 = {
    Terraform = true
  }
  additional_tags1 = merge(local.additional_tags0, var.tags)
  additional_tags2 = var.project != "" ? merge(local.additional_tags1, { Project = lower(format("%v", var.project)) }) : local.additional_tags1
  additional_tags  = var.client != "" ? merge(local.additional_tags2, { Client = lower(format("%v", var.client)) }) : local.additional_tags2
}

module "main_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  namespace = var.namespace
  stage     = var.stage
  name      = var.name

  tags = local.additional_tags
}
