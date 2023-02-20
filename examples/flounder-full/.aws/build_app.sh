#!/usr/bin/env bash
set -u
set -eo pipefail

if [ $# -eq 0 ]; then
  echo "usage: ./build_app.sh APP_NAME [IMAGE_TAG]"
  exit 1
fi

app="${1}"

workdir="$(dirname "$(dirname "$(realpath "$0" )")")"
source "${workdir}/.aws/config.sh"

version="$(jq -r .version "${workdir}"/package.json)"
image_tag="${2:-${version}}"
echo "image_tag=${image_tag}"

echo "BUILDING ${app}, VERSION ${version}"

ECR_REPO="${ECR_NAMESPACE}-${ECR_STAGE}-${ECR_NAME}-${app}"

docker pull "docker.pkg.github.com/elpassion/flounder/${app}" || true #REPLACE_PROJECT

docker build --build-arg VERSION="${version}" \
  -t "${ECR_REPO}" \
  -f "${workdir}/apps/${app}/Dockerfile" "${workdir}" \
  --platform linux/amd64 \
  --cache-from "docker.pkg.github.com/elpassion/flounder/${app}" #REPLACE_PROJECT

docker tag "${ECR_REPO}:latest" "${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPO}:${image_tag}"
docker tag "${ECR_REPO}:latest" "${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPO}:latest"

aws ecr get-login-password --region "${ECR_REGION}" | docker login --username AWS --password-stdin "${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com"
docker push "${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPO}:${image_tag}"
docker push "${ECR_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPO}:latest"

docker tag "${ECR_REPO}" "docker.pkg.github.com/elpassion/flounder/${app}" && docker push "docker.pkg.github.com/elpassion/flounder/${app}" || true #REPLACE_PROJECT
