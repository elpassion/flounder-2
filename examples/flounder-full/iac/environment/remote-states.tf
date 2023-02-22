data "terraform_remote_state" "common" {
  backend = "s3"
  config = {
    bucket = "elpassion-stg-flounder-tfstate" #REPLACE_CLIENT REPLACE_PROJECT
    key    = "common.tfstate"
    region = "eu-west-1"
  }
}
