variable "region" {
  type = string

}

variable "users_with_state_access" {
  type        = list(string)
  description = "List of usernames of users allowed access to tfstate bucket."
}

variable "roles_with_state_access" {
  type        = list(string)
  description = "List of role names allowed access to tfstate bucket."
}

variable "namespace" {
  type = string
}
variable "tenant" {
  type = string
}
variable "stage" {
  type    = string
  default = "all"
}

variable "name" {
  type    = string
  default = "tfstate"
}

variable "attributes" {
  type    = list(string)
  default = []
}

variable "client" {
  type    = string
  default = ""
}

variable "project" {
  type    = string
  default = ""
}
