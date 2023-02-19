stage = "prod"

vpc_cidr = "10.19.0.0/16"

bastion_enabled = true
bastion_ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAEAQDWr4LAnW6P1t8Tcw4r9UMpVxT8LSunmOOMVQ4WGuoIiLbtAAVblCSFjY+oS3vJBRg5nFx7ZY9OI5WTb3riBDwabctxj0GiVkrz7hv3UwaYtQ238uIHHVPXWiMJdUOfEDj83BTUefv/npN157U8Q6texvJvy8L0xsPcnOC4siQSrDc8ZAw1zJ+JhAE6EMPwQDBdkT1OXkoHeOBhyJ1mVdglvUdraz07c6r4tBtIdZsgNGEnpfkFVU761zBg8xcrEkRl/Qnpd3HpYJC/pQ+5ZlUTl89/PzEMnV6D7tUi5hISy7N9ReOHR14/XuNnPcIJL0S9C1vTjGBah7sSE3PbYhi9cGixXpjCWcSVDkyED7pJQNwDTROK5XDK2q41GauHJMpuOQd825armoGfzrFqDDrD71TlVmpOVT+l4jZdoOU9Q9IldxNFXCDpt0xdyDW4kT/okK7yetZNvxxt1MK0sU9eZCbHJelh8ByEIneeyOrvVg2yvNXOcP9i0MWn2ZLXvUq3e9h2zW3NUIN4xry1VEhCQk4f92uDso3ABA5hIPVxI4zL/wXl0XwA4t480YeMFd3bMOB3vxqk/vOsEnxyrwfgkzJaXmh5DeP3btpqDh1+JY5qrfwoRxD6X1hKX+4VfeQz/nHr1kRJliKEtSQ0Z1dH2RnJrBA5pJWVfHgxgD018pEHdZkCpaGFm9RlEE3uK7iSlnhOQdxzADyntjJ8pGl6q2R1GnC7IVMY683bNJ4J5Wjx8SW8eKl9fH17uiyJrGNKI0kN/tYnofCphVPRN5II+2eUPb8f4ZofMPf/SbAzsDGxsZfYDv+HBdee5neIu39NExbXSqZUhmSmBnYzcAJxlUCVCzWOXYuPeNFwUPxdTBUBpw4ozyAQUCPzk4MQUt2/QihwxHJ68GiERsMBBmShFH3nMiLCtu2MQOuHc0RAZyRt2woUXF6blstJtcalOeRJUaU0O6DnkJUrOT2gKown6Kp2HlW4okg2yhyvD+s2lDgEB9X/Tx35lpYAbVNa5FWnOZXTeFmIYClJoERYrXkpC16dRjXEn150U98ts5xCv3IbZAGw7Cx9UCeF41O8Xk+oCJHuJVu92ip9QCJcPgI9SX8ajvzYDWVqONwVcTdJrajDnAINjNsGcz41/Gjopi7Z9cEErekCx1VakbFIMBMZZ8hDfQrf3htpdM9ApDDCBFr0EVyUt2AfiuEOaYw/SnymB6g6aHX8btV4NcZDWOW5uOiSelszSC+Gh/WG8gfyzguyfb2Ux/sqbQOg3Y+PoZmckJBw5MUCYGUMo6RdBJ7eXYq1dBW2679zdVjOfBIkDRUuGtjJPMX2XeK2Cks++rYKrY3/xuFmSLxhOXXaQhpN jakub.andrzejewski@eplassion.pl"

db_storage                     = "20"
db_postgres_version            = "13.7"
db_instance_class              = "db.t3.small"
db_multi_az                    = false
db_backup_retention_period     = 7
db_allow_major_version_upgrade = false
db_apply_immediately           = true
db_deletion_protection         = false
db_iops                        = 0

external_dns_zone_parent_name = "app.elpassion.com"

ecs_config = {
  backend = {
    image_tag   = "latest"
    task_cpu    = 256
    task_memory = 512
  }
  frontend = {
    image_tag   = "latest"
    task_cpu    = 256
    task_memory = 512
  }
  admin = {
    image_tag   = "latest"
    task_cpu    = 256
    task_memory = 512
  }
}

transactional_email_sender_name_for_ses = "no-reply"
backend_stage_specific_env_vars = {
}

cognito_user_pool_domain = "flounderka"

redis_instance_type  = "cache.t3.micro"
redis_engine_version = "6.x"
redis_family         = "redis6.x"
