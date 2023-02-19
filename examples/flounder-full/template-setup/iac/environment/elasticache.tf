module "redis" {
  source = "cloudposse/elasticache-redis/aws"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.42.1"

  context = module.main_label.context
  name    = "redis"

  availability_zones = local.azs
  zone_id            = aws_route53_zone.internal.id
  vpc_id             = module.vpc.vpc_id
  allowed_security_group_ids = [
    module.ecs_sg.security_group_id,
    module.bastion_sg.this_security_group_id,
  ]
  subnets                    = module.vpc.private_subnets
  cluster_mode_enabled       = false
  automatic_failover_enabled = false
  instance_type              = var.redis_instance_type
  apply_immediately          = true
  engine_version             = var.redis_engine_version
  family                     = var.redis_family
  at_rest_encryption_enabled = true
  transit_encryption_enabled = false
  kms_key_id                 = module.kms_key.key_arn
}
