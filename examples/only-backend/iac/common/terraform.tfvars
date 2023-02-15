# hardcoded
roles_with_readonly_access = ["AWSServiceRoleForECS"]

region = "eu-west-1"

namespace = "fch" #REPLACE_PROJECT
stage     = "stg"
name      = "fch" #REPLACE_PROJECT

client  = "elpassion" #REPLACE_CLIENT
project = "fch" #REPLACE_PROJECT

ecr_repositories = [
  "backend",
]
