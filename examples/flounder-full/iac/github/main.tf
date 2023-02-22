provider "github" {
  token = var.token
  owner = "elpassion"
}

data "github_repository" "app" {
  full_name = "elpassion/flounder" #REPLACE_PROJECT
}

resource "github_actions_secret" "aws_access_key_id" {
  plaintext_value = data.terraform_remote_state.ecr.outputs.ci_access_key_id
  repository      = data.github_repository.app.name
  secret_name     = "AWS_ACCESS_KEY_ID"
}

resource "github_actions_secret" "aws_secret_access_key" {
  plaintext_value = data.terraform_remote_state.ecr.outputs.ci_secret_access_key
  repository      = data.github_repository.app.name
  secret_name     = "AWS_SECRET_ACCESS_KEY"
}
