# Common values for all environments, they can be overridden in stage specific x.tfvars file

region = "eu-west-1"

namespace = "fch"
client    = "elpassion"
project   = "fch"

internal_tld = "fch.internal"

vpc_az_count                   = 2
vpc_public_networks_new_bits   = 6
vpc_private_networks_new_bits  = 4
vpc_database_networks_new_bits = 6
vpc_single_nat_gateway         = true

backend_all_stages_env_vars = {
  "NODE_ENV" = "production"
  "API_PORT" = "8000"
}
