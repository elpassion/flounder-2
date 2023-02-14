terraform {
  required_version = "1.2.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket         = "elpassion-stg-fch-tfstate" # FIXME
    key            = "common.tfstate"
    region         = "eu-west-1"                      # Bucket region, not deployment region
    dynamodb_table = "elpassion-stg-fch-tfstate" # FIXME
  }
}
