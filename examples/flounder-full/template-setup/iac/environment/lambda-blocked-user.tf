module "lambda_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"

  context = module.main_label.context

  name = "lambda_blocked_user"
}


module "lambda_blocked_user" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.36.0"

  function_name = module.lambda_label.id
  description   = ""
  handler       = "index.handler"
  runtime       = "nodejs14.x"

  source_path = "./src/lambda_blocked_user"

  tags = module.lambda_label.tags


}
