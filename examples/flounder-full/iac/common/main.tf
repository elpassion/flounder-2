provider "aws" {
  region = var.region
}

locals {
  additional_tags0 = {
    Terraform      = true
    TerraformState = "elpassion-stg-flounder-tfstate/common.tfstate" # FIXME
  }
  additional_tags1 = var.project != "" ? merge(local.additional_tags0, { Project = lower(format("%v", var.project)) }) : local.additional_tags0
  additional_tags  = var.client != "" ? merge(local.additional_tags1, { Client = lower(format("%v", var.client)) }) : local.additional_tags1
}

data "aws_caller_identity" "this" {}

module "label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  namespace = var.namespace
  stage     = var.stage
  name      = var.name

  tags = local.additional_tags
}