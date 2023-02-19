output "region" {
  description = "AWS region"
  value       = var.region
}

output "ecr_repo_names" {
  value = {
    for key in var.ecr_repositories :
    key => module.ecr[key].repository_name
  }
}

output "ecr_repo_urls" {
  value = {
    for key in var.ecr_repositories :
    key => module.ecr[key].repository_url
  }
}
