# Common values for all environments, they can be overridden in stage specific x.tfvars file

region = "eu-west-1"

namespace = "flounder"
client    = "elpassion"
project   = "flounder"

internal_tld = "flounder.internal"

vpc_az_count                   = 2
vpc_public_networks_new_bits   = 6
vpc_private_networks_new_bits  = 4
vpc_database_networks_new_bits = 6
vpc_single_nat_gateway         = true

db_postgres_version       = "13.4"
db_parameter_group_family = "postgres13"
db_instance_class         = "db.t3.small"
db_username               = "xxx" # only alphanumeric
db_backup_window          = "04:39-05:09"
db_maintenance_window     = "sat:00:48-sat:01:18"
db_database_name          = "xxx" # only alphanumeric

s3_uploads_cors_additional_allowed_origins           = []
retooljet_s3_uploads_cors_additional_allowed_origins = []

backend_all_stages_env_vars = {
  "NODE_ENV" = "production"
  "API_PORT" = "8000"
}
admin_all_stages_env_vars = {
  "NODE_ENV" = "production"
}

frontend_all_stages_env_vars = {
  "NODE_ENV" = "production"
}
