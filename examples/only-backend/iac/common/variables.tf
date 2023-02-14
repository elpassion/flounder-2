variable "region" {
  type        = string
  description = "AWS region for the deployment"
}

variable "ecr_repositories" {
  type        = list(string)
  default     = ["backend"]
  description = "ECR repositories to create; Caution: be careful when changing this value, terraform may perform destructive actions."
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

variable "roles_with_readonly_access" {
  type    = list(string)
  default = []
}
