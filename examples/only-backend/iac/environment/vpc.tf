data "aws_availability_zones" "this" {}

locals {
  azs = slice(data.aws_availability_zones.this.names, 0, var.vpc_az_count)
  _public_networks = [for az in local.azs : {
    name     = "public-${az}"
    new_bits = var.vpc_public_networks_new_bits
  }]
  _private_networks = [for az in local.azs : {
    name     = "private-${az}"
    new_bits = var.vpc_private_networks_new_bits
  }]
  _database_networks = [for az in local.azs : {
    name     = "database-${az}"
    new_bits = var.vpc_database_networks_new_bits
  }]
  _networks = flatten([local._public_networks, local._private_networks, local._database_networks])
}

module "subnet_addrs" {
  source = "hashicorp/subnets/cidr"

  base_cidr_block = var.vpc_cidr
  networks        = local._networks
}

locals {
  public_subnets = [for k, v in module.subnet_addrs.networks :
    v.cidr_block
    if substr(v.name, 0, 3) == "pub"
  ]
  private_subnets = [for k, v in module.subnet_addrs.networks :
    v.cidr_block
    if substr(v.name, 0, 3) == "pri"
  ]
  database_subnets = [for k, v in module.subnet_addrs.networks :
    v.cidr_block
    if substr(v.name, 0, 3) == "dat"
  ]
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.77.0"

  name             = module.main_label.id
  cidr             = var.vpc_cidr
  azs              = local.azs
  public_subnets   = local.public_subnets
  private_subnets  = local.private_subnets
  database_subnets = local.database_subnets

  create_database_subnet_group = true
  enable_dns_hostnames         = true
  enable_dns_support           = true

  enable_nat_gateway = true
  single_nat_gateway = var.vpc_single_nat_gateway
  enable_vpn_gateway = false

  enable_s3_endpoint             = var.vpc_enable_s3_endpoint
  s3_endpoint_security_group_ids = module.s3_endpoint_sg.*.this_security_group_id

  tags = { for k, v in module.main_label.tags : k => v if k != "Name" }
}

module "s3_endpoint_sg" {
  count   = var.vpc_enable_s3_endpoint ? 1 : 0
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 3.18"

  name   = "${module.main_label.id}-s3-endpoint"
  vpc_id = module.vpc.vpc_id

  ingress_rules       = ["http-80-tcp", "https-443-tcp"]
  ingress_cidr_blocks = module.vpc.private_subnets_cidr_blocks

  egress_rules       = ["all-all"]
  egress_cidr_blocks = ["0.0.0.0/0"]
  tags               = module.main_label.tags
}


resource "aws_route53_zone" "internal" {
  name = "${var.stage}.${var.internal_tld}"
  vpc {
    vpc_id = module.vpc.vpc_id
  }
  tags = module.main_label.tags
}
