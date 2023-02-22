data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "elpassion-stg-flounder-tfstate" #REPLACE_PROJECT REPLACE_CLIENT
    key    = "common.tfstate"
    region = "eu-west-1"
  }
}
