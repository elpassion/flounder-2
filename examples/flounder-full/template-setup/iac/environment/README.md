## Before you begin

This configuration uses **terraform workspaces**.

## Quick instructions

### Initial provisioning

AWS infra

```shell
# cd into this directory
terraform init

# optional, shows you the list of workspaces
terraform workspace list

# necessary
terraform workspace select stg

# optional, just shows you the plan without modifying anything
terraform plan -var-file=stg.tfvars

# without any changes to config files, on the first run apply will save kubeconfig to a local file
terraform apply -var-file=stg.tfvars
```
