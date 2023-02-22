# flounder

## Development environment

### Local setup

Please ensure you have the following tools installed:

- node v.16
- pnpm
- docker

#### Before running

- If you didn't do this earlier, setup your AWS account - [instruction Logging In](https://www.notion.so/elpassion/User-access-0ca1a984d8d84d17a2d169585703a4f5)
- Install [pipx](https://www.npmjs.com/package/pip)
- Install [awsume](https://awsu.me/general/quickstart.html)

```bash
pipx install awsume
```

- in your console use command `awsume-configure` and then close and open it

#### Install

Install packages by running:

```bash
pnpm install
```

##### AWS Setup

In console inside IDE always before you start working run this command:

```bash
# To login as correct user to aws.
$ awsume -a flounder-developer #REPLACE_PROJECT
#or for longer duration of role
$ awsume --role-duration 14400 flounder-developer #REPLACE_PROJECT
```

#### Run

You need to encrypt envs, open two tabs in your terminal/console and run following commands:

1. `pnpm run dev:decrypt-envs` - To decrypt ENV variables
2. `pnpm run dc:dependencies up` - Terminal 1
3. `pnpm run serve` - Terminal 2

##### Commands, that you might need

```bash
# to decrypt development env variables
$ pnpm run dev:decrypt-envs

# to start dependencies
$ pnpm run dc:dependencies up

# to run whole stack (awsume command should be used in the same terminal before that command)
$ pnpm run serve

# to run storybook
$ pnpm run storybook

# to run affected specs
$ pnpm run test

# to run e2e specs
$ pnpm run test:e2e

# to run all specs
$ pnpm run test:all

# to compile project (check type errors)
$ pnpm run compile

# to type-check everything in the project
$ pnpm run tsc:all
```

#### React-native

#### Before running

Go to apps/mobile directory and run this command:

```bash
$ pnpm install
```

#### Run

In console inside IDE run this command:

```bash
# to run android on simulator/device
$ npm run start:android

# to run iso on simulator/device
$ npm run start:ios
```

Use npm in above commands, with pnpm react-native application won't start

### Docker setup

App supports running dependencies through docker.

Please ensure you have the following tools installed:

- docker
- docker-compose

```bash
$ pnpm run dc:dependencies up
```

## Environment Variables encryption/decryption

### Required setup after generating new project from Flounder

- AWS SecretsManager must be set up with a special secret for decrypting/encrypting envs (configuration in Terraform files)
- Make sure secret name matches with the name in `.development/manage-env-vars.ts` file
- Create `.env.development` files for `frontend`, `backend` & `admin` app and fill with valid values from `AWS` or change `AWS` related values in existed `env.development` files. For `mobile` app use `.env` file.
- Encrypt new vars: `pnpm run dev:encrypt-envs`
- Push your changes to repo
- Now everyone in the project can get env values by `pnpm run dev:decrypt-envs`

### Working with env variables

#### Decrypting env vars

```bash
$ pnpm run dev:decrypt-envs
```

#### Adding new env vars

1. Add new envs in those files:

```
template-setup/iac/environment/ecs-*.tf
packages/*/.env.development
```

2. Make sure `.env.development` files match `.env.template` files
3. Run this command:

```bash
$ pnpm run dev:encrypt-envs
```

## Release to production

- Check latest production tag with:`git tag | grep prod | tail -1`
- Add new tag matching pattern `git tag v<version>-prod`
- Push the new tag `git push --tags`

## Health and Version

Both backend and frontend provide documentation and health related endpoints, available at:

```
/api/ping # health check
/api/version # current version
```

## Swagger

Backend API provides swagger documentation for endpoints available at:

```
http:/localhost:3001/swagger # during development
```

Notice you can Authorize your requests by clicking the _Authorize_ button in top right

## UML Diagrams

In case of complicated flow in case, create README file with uml diagram explaining how it works.

- [Example ↗](https://github.com/elpassion/flounder/tree/main/apps/backend/src/modules/email-subscriptions)
- [Marmaid docs](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)

## Cloudwatch monitoring setup

It's temporary solution. Visit [Cloudwatch]('https://eu-west-1.console.aws.amazon.com/cloudwatch/home') and setup metric and alarm manually following steps below:

#### 1. Create metric

- Go to `Logs -> Log groups -> Actions -> Create metric filter`.
- Fill form
  - `Filter pattern` should be
    `[type, method, url, responseStatus=5*, responseTime, InBody, OutBody]`
    if using default flounder logger setup.
  - `Metric value` should be equal to 1.
  - `Default value` should be equal to 0.

#### 2. Create metric alarm

- Go to `Logs -> Log groups -> My_Log_Group -> Metric filters`. Here you can see metric created at step 1.
- Select metric by clicking on top-right corner checkbox and then click on `Create alarm`.
- Fill the form and then click `Next`.
- Example working setup
  - `Statistic` - sum
  - `Period` - 1 minute
  - `Threshold type` - Static
  - `Alarm condition` - Greater > threshold
  - `Threshold` - 0. It means that our alarm will be triggered by every single log with responseStatus equal to 5\*\*
- Now you have to configure action. Fill the form and click `Next`.
- Example working setup:
  - `Alarm state trigger` - In alarm.
  - `SNS topic` - If you haven't created any topic before, choose `Create new topic`, give it a name and pass list of emails.
- Fill `Alarm name` and `Alarm description` then click `Next`.
- Check if everything looks as expected then click `Create alarm`.
- Done!

## Cognito UI

You can customize the UI of Cognito Sign up/Sign in view.

### 1. Customize styles

- Go to `template-setup -> iac -> environment -> cognito.css` and make changes. You can only change some of the properties - you can find a list of them here: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-ui-customization.html .
- You can also change the logo - replace the `cognito-logo.jpg` file, located in the same folder as the css file. If the file has a different name or extension, you need to change the `image_file` path in the file `cognito.tf` as well.

### 2. Apply changes

- Create a pull request. Wait until all atlantis actions are over. If there are no errors, leave a comment saying "atlantis apply" below pull request.
- Merge pull request.

## Documentation template

When you develop new lib, use [Library Documentation Template](./LIBS_DOCS_TEMPLATE.md) for `README`.

## Generating new package

Flounder allow generating new start Next.js (frontend, admin), NestJS (backend) and React Native (mobile) apps with some base features.<br>
Detailed info you find in [template-setup README](./template-setup/README.md).
