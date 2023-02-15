data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "elpassion-stg-fch-tfstate" #REPLACE_CLIENT #REPLACE_PROJECT
    key    = "common.tfstate"
    region = "eu-west-1"
  }
}
