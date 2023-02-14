data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "elpassion-stg-fch-tfstate"
    key    = "common.tfstate"
    region = "eu-west-1"
  }
}
