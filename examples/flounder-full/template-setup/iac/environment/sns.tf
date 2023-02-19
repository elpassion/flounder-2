module "sns_label" {
  source  = "cloudposse/label/null"
  version = "~> 0.25.0"
  context = module.ecs_label.context

  attributes = ["sns", "ecs", "errors"]
}

resource "aws_sns_topic" "ecs_errors" {
  name = module.sns_label.id
}

resource "aws_cloudwatch_metric_alarm" "error_500" {
  alarm_name          = var.metric_filter_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = var.metric_filter_name
  namespace           = var.namespace
  period              = "60"
  statistic           = "Sum"
  threshold           = "0"
  alarm_actions       = [aws_sns_topic.ecs_errors.id]
}
