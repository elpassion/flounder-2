locals {
  ecs_data = {
    "${module.ecs_backend_label.id}"  = "${module.backend_ecs.cloudwatch_log_group_name}",
    "${module.ecs_frontend_label.id}" = "${module.frontend_ecs.cloudwatch_log_group_name}",
    "${module.ecs_admin_label.id}"    = "${module.admin_ecs.cloudwatch_log_group_name}"
  }
}

resource "aws_cloudwatch_query_definition" "response_time_query" {
  for_each = local.ecs_data

  name            = "${each.key}_response_time_query"
  log_group_names = [each.value]

  query_string = <<EOF
    stats count(*), max(responseTime) as maxResponseTime, avg(responseTime) as avgResponseTime by(req.url)
    | sort avgResponseTime desc
    | limit 100
  EOF
}

resource "aws_cloudwatch_query_definition" "query_500" {
  for_each = local.ecs_data

  name            = "${each.key}_500_query"
  log_group_names = [each.value]

  query_string = <<EOF
    filter res.statusCode >= 500
    | stats count(*) by req.url, res.statusCode
    | limit 100
  EOF
}

resource "aws_cloudwatch_log_metric_filter" "filter_500" {
  for_each = local.ecs_data

  name           = "${var.metric_filter_name} - ${each.key}"
  pattern        = "[type, method, url, responseStatus=5*, responseTime, InBody, OutBody]"
  log_group_name = each.value

  metric_transformation {
    name      = var.metric_filter_name
    namespace = var.namespace
    value     = "1"
  }
}
