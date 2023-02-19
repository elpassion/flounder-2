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

variable "metric_filter_name" {
  type    = string
  default = "Error 5xx"
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

############### RDS ################
variable "db_storage" {
  type = number
  //  default = 20
}

variable "db_postgres_version" {
  type = string
  //  default = "5.7.31"
}

variable "db_parameter_group_family" {
  type = string
}

variable "db_instance_class" {
  type = string
  //  default = "db.t3.small"
}

variable "db_username" {
  type = string
  //  default = "finxs"
}

variable "db_multi_az" {
  type = bool
  //  default = false
}

variable "db_backup_retention_period" {
  type = number
}

variable "db_backup_window" {
  type = string
  //  default = "04:39-05:09"
}
variable "db_maintenance_window" {
  type = string
  //  default = "sat:00:48-sat:01:18"
}

variable "db_allow_major_version_upgrade" {
  type = bool
  //  default = false
}
variable "db_apply_immediately" {
  type = bool
  //  default = false
}
variable "db_database_name" {
  type        = string
  description = "The name of the database to create when the DB instance is created."
}

variable "db_deletion_protection" {
  type = bool
}

variable "db_iops" {
  type        = number
  default     = 0
  description = "If 0, DB will have storage class 'gp2'. Else it will have 'io1', with provisioned iops."
}

############### /RDS ################
############### redis ################
variable "redis_instance_type" {
  type = string
}
variable "redis_engine_version" {
  type    = string
  default = "6.x"
}
variable "redis_family" {
  type    = string
  default = "redis6.x"
}
############### /redis ################
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
  external_dns_zone_name = var.stage != "prod" ? "${var.stage}.${var.namespace}.${var.external_dns_zone_parent_name}" : "${var.stage}.${var.namespace}.${var.external_dns_zone_parent_name}"
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

variable "transactional_email_sender_name_for_ses" {
  type = string
}

variable "backend_all_stages_env_vars" {
  type    = map(string)
  default = {}
}
variable "backend_stage_specific_env_vars" {
  type    = map(string)
  default = {}
}

variable "admin_all_stages_env_vars" {
  type    = map(string)
  default = {}
}
variable "admin_stage_specific_env_vars" {
  type    = map(string)
  default = {}
}

variable "frontend_all_stages_env_vars" {
  type    = map(string)
  default = {}
}
variable "frontend_stage_specific_env_vars" {
  type    = map(string)
  default = {}
}

############### /ECS env vars ################

variable "s3_uploads_cors_additional_allowed_origins" {
  type    = list(string)
  default = []
}

############### /Cognito env vars ################

variable "cognito_callback_urls" {
  type    = list(string)
  default = []
}

variable "cognito_callback_urls_without_secret" {
  type    = list(string)
  default = []
}

variable "cognito_logout_urls" {
  type    = list(string)
  default = []
}

variable "cognito_user_pool_domain" {
  type        = string
  default     = ""
  description = "Cognito user pool domain name"
}

############### /Lowcode admin tools ################
variable "retooljet_s3_uploads_cors_additional_allowed_origins" {
  type    = list(string)
  default = []
}
