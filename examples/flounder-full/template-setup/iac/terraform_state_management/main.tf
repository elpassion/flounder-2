locals {
  additional_tags = {
    Client  = lower(format("%v", var.client))
    Project = lower(format("%v", var.project))
  }
  shorten_regions   = true
  naming_convention = local.shorten_regions ? "to_short" : "identity"
  az_map            = module.utils.region_az_alt_code_maps[local.naming_convention]
}

module "utils" {
  source = "cloudposse/utils/aws"
  # Cloud Posse recommends pinning every module to a specific version
  # version     = "x.x.x"
}

module "label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25"

  namespace   = var.namespace
  tenant      = var.tenant
  environment = local.az_map[var.region]
  stage       = var.stage
  name        = var.name
  attributes  = var.attributes

  label_order = ["tenant", "stage", "name", "attributes"]
  tags        = local.additional_tags
}
