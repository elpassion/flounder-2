region                  = "eu-west-1"
users_with_state_access = []
roles_with_state_access = ["full-admin", "elp-prod-atlantis-ecs_task_execution"]

namespace  = "elp"
tenant     = "elpassion"
stage      = "stg"
name       = "fch" #REPLACE_PROJECT
attributes = ["tfstate"]

client  = "elpassion" #REPLACE_CLIENT
project = "fch" #REPLACE_PROJECT
