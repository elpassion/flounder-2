terraform {
  required_version = "~> 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "elpassion-stg-flounder-tfstate" # FIXME
    key            = "environment.tfstate"
    region         = "eu-west-1"                      # Bucket region, not deployment region
    dynamodb_table = "elpassion-stg-flounder-tfstate" # FIXME
  }
}
