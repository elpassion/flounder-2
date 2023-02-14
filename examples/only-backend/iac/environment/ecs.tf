resource "aws_ecs_cluster" "this" {
  name = module.main_label.id
  tags = module.main_label.tags

  capacity_providers = ["FARGATE"]
  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
  }
}
module "ecs_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "ecs"
}

module "ecs_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.2.0"

  name   = module.ecs_label.id
  vpc_id = module.vpc.vpc_id
  tags   = module.ecs_label.tags

  ingress_rules = ["http-80-tcp"]
  ingress_cidr_blocks = [
  module.vpc.vpc_cidr_block]
  ingress_with_cidr_blocks = [
    {
      from_port   = 8000
      to_port     = 8000
      protocol    = "tcp"
      description = "backend"
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]

  egress_rules       = ["all-all"]
  egress_cidr_blocks = ["0.0.0.0/0"]
}
