#!/usr/bin/env bash
set -u
set -eo pipefail

if [ $# -eq 0 ]; then
  echo "usage: ./deploy_app.sh APP_NAME APP_STAGE IMAGE_TAG"
  exit 1
fi

workdir="$(dirname "$(dirname "$(realpath "$0" )")")"

APP_NAME="${1}"
APP_STAGE="${2:-unspecified}"
version="$(jq -r .version "${workdir}"/package.json)"
IMAGE_TAG="${3:-${version}}"
TEMP_DIR="$(mktemp -d)"

source "${workdir}/.aws/config.sh"

old_task_definition="${TEMP_DIR}/old_task_definition.json"
new_container_definitions="${TEMP_DIR}/new_container_definitions.json"
new_task_definition="${TEMP_DIR}/new_task_definition.json"


if [ "${APP_NAME}" == "backend" ]; then
  APP_NAMES="backend"  # "backend admin"
else
  APP_NAMES="${APP_NAME}"
fi

for APP_NAME in ${APP_NAMES}
do
  echo "DEPLOYING ${APP_NAME} ${APP_STAGE} ${IMAGE_TAG}"

  ECR_REPO="${ECR_NAMESPACE}-${ECR_STAGE}-${ECR_NAME}-${APP_NAME}"
  DOCKER_REPOSITORY="${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPO}"
  DOCKER_IMAGE="${DOCKER_REPOSITORY}:${IMAGE_TAG}"

  ECS_SERVICE_NAME="${ECS_NAMESPACE}-${APP_STAGE}-ecs-${APP_NAME}"
  echo "DEPLOYING ${ECS_SERVICE_NAME}"
  aws ecs describe-task-definition --task-definition "${ECS_SERVICE_NAME}" > "${old_task_definition}"
  jq ".taskDefinition.containerDefinitions" "${old_task_definition}" |
    jq -c \
      --arg image "${DOCKER_IMAGE}" \
      --arg repo "${DOCKER_REPOSITORY}" \
      'map(if .image | test($repo) then . + {"image": $image } else . end)' \
      > "${new_container_definitions}"

  jq ".taskDefinition" "${old_task_definition}" |
    jq 'del(.containerDefinitions)' |
    jq 'del(.taskDefinitionArn)' |
    jq 'del(.revision)' |
    jq 'del(.requiresAttributes)' |
    jq 'del(.compatibilities)' |
    jq 'del(.registeredAt)' |
    jq 'del(.registeredBy)' |
    jq 'del(.status)' |
    jq -c --slurpfile container_definitions "${new_container_definitions}" '. + {"containerDefinitions": $container_definitions[0]}' \
    > "${new_task_definition}"

  aws --no-cli-pager ecs register-task-definition --cli-input-json file://"${new_task_definition}"

  aws --no-cli-pager ecs update-service --cluster "${ECS_NAMESPACE}-${APP_STAGE}" \
    --service "${ECS_SERVICE_NAME}" \
    --task-definition "${ECS_SERVICE_NAME}" \
    --force-new-deployment
done
