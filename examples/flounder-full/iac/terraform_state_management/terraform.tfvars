region                  = "eu-west-1"
users_with_state_access = []
roles_with_state_access = ["full-admin", "elp-prod-atlantis-ecs_task_execution"]

namespace  = "elp"
tenant     = "elpassion"
stage      = "stg"
name       = "flounder" #REPLACE_PROJECT
attributes = ["tfstate"]

client  = "elpassion" #REPLACE_CLINET
project = "flounder" #REPLACE_PROJECT
