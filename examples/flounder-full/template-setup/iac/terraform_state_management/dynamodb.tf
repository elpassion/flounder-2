resource "aws_dynamodb_table" "tfstate" {
  name         = module.label.id # hardcoded in version-state.tf !
  hash_key     = "LockID"
  billing_mode = "PAY_PER_REQUEST"

  tags = module.label.tags

  attribute {
    name = "LockID"
    type = "S"
  }

  server_side_encryption {
    enabled     = true
    kms_key_arn = module.kms_key.key_arn
  }
}

output "tfstate_dynamodb_table" {
  value = aws_dynamodb_table.tfstate.name
}
