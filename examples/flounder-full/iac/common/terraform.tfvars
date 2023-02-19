# hardcoded
roles_with_readonly_access = ["AWSServiceRoleForECS"]

region = "eu-west-1"

namespace = "flounder"
stage     = "stg"
name      = "xxx"

client  = "elpassion"
project = "flounder"

ecr_repositories = [
  "backend",
  "frontend",
  "admin",
]