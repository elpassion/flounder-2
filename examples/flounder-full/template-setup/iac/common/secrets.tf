resource "random_password" "default_env_vars_encryption_key" {
  length  = 20
  special = false
}

resource "aws_secretsmanager_secret" "env_vars_encryption_key" {
  name = "${var.project}-${var.stage}-env-vars-encryption-key"
  description = "A secret key to decrypt env vars encrypted in the git repository (dev envs)."
  tags = local.additional_tags
}

resource "aws_secretsmanager_secret_version" "secret_val" {
  secret_id     = aws_secretsmanager_secret.env_vars_encryption_key.id
  secret_string = random_password.default_env_vars_encryption_key.result
}
