variable "region" {
  type        = string
  description = "AWS region for the deployment"
}

variable "bastion_enabled" {
  type = bool
}

variable "bastion_ssh_key" {
  type        = string
  description = "SSH key that allows access to bastion. Has to be RSA - AWS doesn't support different types."
}

variable "namespace" {
  type        = string
  default     = ""
  description = "Namespace, which could be your organization name or abbreviation, e.g. 'eg' or 'cp'"
}

variable "stage" {
  type        = string
  default     = ""
  description = "Stage, e.g. 'prod', 'staging', 'dev'"
}

variable "name" {
  type        = string
  default     = ""
  description = "Solution name, e.g. `app` or `jenkins`"
}

variable "delimiter" {
  type        = string
  default     = "-"
  description = "Delimiter to be used between `namespace`, `stage`, `name` and `attributes`"
}

variable "attributes" {
  type        = list(string)
  default     = []
  description = "Additional attributes (e.g. `1`)"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Additional tags (e.g. `map('BusinessUnit','XYZ')`"
}

variable "client" {
  type    = string
  default = ""
}

variable "project" {
  type    = string
  default = ""
}


############### VPC ################
variable "vpc_cidr" {
  type = string
}
variable "vpc_az_count" {
  type        = number
  description = "How many AZs should the vpc span into"
}
variable "vpc_enable_s3_endpoint" {
  type    = bool
  default = false
}
variable "vpc_public_networks_new_bits" {
  type        = number
  description = "For explanation look up new_bits here: https://registry.terraform.io/modules/hashicorp/subnets/cidr/latest"
}
variable "vpc_private_networks_new_bits" {
  type        = number
  description = "For explanation look up new_bits here: https://registry.terraform.io/modules/hashicorp/subnets/cidr/latest"
}
variable "vpc_database_networks_new_bits" {
  type        = number
  description = "For explanation look up new_bits here: https://registry.terraform.io/modules/hashicorp/subnets/cidr/latest"
}
variable "vpc_single_nat_gateway" {
  type = bool
}
############### /VPC ################

############### DNS ################
variable "internal_tld" {
  type    = string
  default = "internal"
}

variable "external_dns_zone_parent_name" {
  type    = string
  default = ""
}

locals {
  external_dns_zone_name = var.stage != "prod" ? "${var.stage}.${var.namespace}.${var.external_dns_zone_parent_name}" : "fixme" # FIXME decide on prod convention
}
############### /DNS ################

variable "ecs_config" {
  type = map(object({
    image_tag   = string
    task_cpu    = number
    task_memory = number
  }))
}

############### ECS env vars ################

variable "backend_all_stages_env_vars" {
  type    = map(string)
  default = {}
}
variable "backend_stage_specific_env_vars" {
  type    = map(string)
  default = {}
}
