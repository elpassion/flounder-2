terraform {
  required_version = "1.2.3"

  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "elpassion-stg-flounder-tfstate"
    key            = "github.tfstate"
    region         = "eu-west-1" # Bucket region, not deployment region
    dynamodb_table = "elpassion-stg-flounder-tfstate"
  }
}
