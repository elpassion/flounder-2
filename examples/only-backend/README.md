# fch

## Development environment

### Local setup

Please ensure you have the following tools installed:

- node
- pnpm
- docker

#### Install

Install packages by running:

```bash
pnpm install
```

#### Before running

##### AWS Setup

In console inside IDE run this command:

```bash
# To login as correct user to aws.
$ awsume -a fch-developer
```

#### Run

```bash
# to start dependencies
$ pnpm run dc:dependencies up

# to run whole stack (awsume command should be used in the same terminal before that command) 
$ pnpm run serve

# to run specs
$ pnpm run test

# to run e2e specs
$ pnpm run test:e2e

# to compile project (check type errors)
$ pnpm run compile

## Health and Version

Backend provided documentation and health related endpoints, available at:

```
/api/ping # health check
/api/version # current version
```

## Cloudwatch monitoring setup

It's temporary solution. Visit [Cloudwatch]('https://eu-west-1.console.aws.amazon.com/cloudwatch/home') and setup metric and alarm manually following steps below:

#### 1. Create metric

- Go to `Logs -> Log groups -> Actions -> Create metric filter`.
- Fill form
  - `Filter pattern` should be
    `[type, method, url, responseStatus=5*, responseTime, InBody, OutBody]`
    if using default fch logger setup.
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

