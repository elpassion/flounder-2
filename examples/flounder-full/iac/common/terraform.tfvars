# hardcoded
roles_with_readonly_access = ["AWSServiceRoleForECS"]

region = "eu-west-1"

namespace = "flounder" #REPLACE_PROJECT
stage     = "stg"
name      = "xxx"

client  = "elpassion" #REPLACE_CLIENT
project = "flounder" #REPLACE_PROJECT

ecr_repositories = [
  "backend",
  "frontend",
  "admin",
]
