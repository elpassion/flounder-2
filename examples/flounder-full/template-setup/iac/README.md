# Infrastructure as Code setup instructions

Note: if you get an error telling you to run `terraform init`, please do.
Note 2: if you stumble upn a `enter variables to tfvars / tf file` then it might turn out that they are already there. (you can ensure that by searching for `#FIXME` in those files)

# Staging / dev environment in El Passion AWS account

## 0. Prerequisites

1. Before starting ensure that you have assumed the role `full-admin` in AWS. This will allow you to create all of the resources.
2. This tutorial assumes that the whole setup (both `code` and `iac` and `atlantis` are pushed to a elpassion repository on github with the same name as the project name - https://github.com/elpassion/flounder). If you did not yet push the code to github do it before running those commands.
3. To push images you need to build them first. To do that you will need `node` and `pnpm`  set up in your environment.
4. To setup `atlantis` communication for `github` you need to be a `github admin` in organization.

## I. Terraform state management

We store terraform state in a separate S3 bucket for each customer.
Additionally, we create a separate Dynamo DB table for terraform state locking.

1. `cd iac/terraform_state_management`
2. In `version-state.tf` comment out the `backend {}` block.
3. Enter correct variable values in `terraform.tfvars` file.
4. Run `terraform apply`.
5. In `version-state.tf` uncomment the `backend` block. Change values for `bucket` and `dynamodb_table` to the names of created resources.
6. Run `terraform init`. Confirm that you want to copy the state file to the new backend.
7. [Optional] `rm terraform.tfstate*`
8. **Change the bucket and dynamodb table in every other `version-state.tf`.**

## II. Common resources

This creates resources that may be shared by all environments, namely ECR repositories and IAM user for GitHub actions.

1. `cd iac/common`
2. Enter correct variable values in `terraform.tfvars` file.
3. Run `terraform apply`.


## III. GitHub secrets for CI

1. `cd iac/github`
2. Enter correct variable values in `terraform.tfvars` file.
3. Run `terraform apply`. When prompted, enter your [GitHub user token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), that has `repo` permissions or use Atlantis gh token.


## IV. Push Images
1. Trigger push to ECR by changing any line of code in code/packages/PACKAGE_YOU_WANT_TO_DEPLOY and pushing code onto the `main` branch.
2. Check if the action has successfully pushed the images at [Github Actions](https://github.com/elpassion/flounder/actions). If it failed check why. If the failing step was `npm run ci:docker:deploy` then great! It means the images have been built and pushed. But the environment is not ready for them yet.

## V. The environment.

If your apps have been successfully pushed to ECR than you're ok to follow those further steps.

1. `cd iac/environment`
2. Run `terraform workspace new stg` (`stg`, `dev`...)
3. Enter correct variable values in `terraform.tfvars` file.
4. Enter correct variable values in `stg.tfvars` file.
5. Run `terraform apply -var-file=stg.tfvars -target module.vpc -target module.alb -target module.db -target aws_route53_zone.internal -target aws_key_pair.bastion -target aws_instance.bastion -target module.external_alb`.
6. Run `terraform apply -var-file=stg.tfvars`.

# Production (and/or staging) in the client's account

Assuming we want to keep the existing environment in El Passion account.

## 0. Prerequisites

1. Create a new branch, for production IaC.
2. Delete all `.terraform` directories.
3. Get AWS access keys for the client's account.

## I. Terraform state management

Follow the steps from above.
In step no. 3 (variables setup), make sure to change the `namespace`.
Step 8 is very important.

## II. Common resources

Follow the steps from above.

## III. GitHub secrets for CI

1. `cd iac/github`
2. In `main.tf` change both `secret_name`, to start with `CLIENT_` (assuming the CI/CD is still in the `elpassion` GitHub organization)
3. Follow the steps from above.

## IV. Push Images

[WIP - not yet working] Follow the steps from above but rather than pushing the code to `main` tag a commit on `main` branch with `vX.X` tag.

## V. The environment.

Follow the steps from above.
Pay attention to the DNS setup, as in production the app may be hosted directly on Client's domain, and not in a parent zone.

