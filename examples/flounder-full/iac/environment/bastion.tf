data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

module "bastion_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.main_label.context

  name = "bastion"
}

resource "aws_key_pair" "bastion" {
  key_name   = module.bastion_label.id
  public_key = var.bastion_ssh_key
}


module "bastion_sg" {
  source  = "terraform-aws-modules/security-group/aws//modules/ssh"
  version = "~> 3.18.0"

  name   = module.bastion_label.id
  vpc_id = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
}

module "access_from_bastion_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 3.0"
  name    = "access-from-bastion"
  vpc_id  = module.vpc.vpc_id
  computed_ingress_with_source_security_group_id = [
    {
      rule                     = "all-all"
      source_security_group_id = module.bastion_sg.this_security_group_id
    }
  ]
  number_of_computed_ingress_with_source_security_group_id = 1
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.ubuntu.id
  subnet_id     = module.vpc.public_subnets[0]
  instance_type = "t3.nano"
  key_name      = aws_key_pair.bastion.key_name
  vpc_security_group_ids = [
    module.bastion_sg.this_security_group_id,
    module.access_to_db_sg.security_group_id,
  ]

  root_block_device {
    volume_type = "gp2"
    volume_size = 20
    encrypted   = true
    kms_key_id  = module.kms_key.key_arn
  }

  tags = module.bastion_label.tags

  lifecycle {
    ignore_changes = [ami]
  }
}
