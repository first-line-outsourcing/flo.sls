# AWS + Serverless API for your application

## Project information

It is a skeleton for your AWS + Serverless applications. It uses typescript,
webpack, dir-config plugin for Serverless function and resources and env
plugin for encrypted environment variables.

## NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment
- **build**: build the application with webpack but without deploy,
- **lint**: start tslint for project files
- **test**: start unit tests
- **test:ci**: start test in CI environment
- **sqs:up**: start Docker SQS container for local development
- **sqs:down**: stop Docker SQS container for local development
- **sqs:list-queues**: list local queues
- **sqs:create-queue**: create local queue (remove square brackets for FIFO queue)
- **sqs:receive-messages**: receive messages from local queue (remove square brackets for FIFO queue)
- **sqs:delete-queue**: delete local queue (remove square brackets for FIFO queue)
- **db:up**: start Docker Postgres container for local development
- **db:drop**: drop Postgres database
- **db:create**: create Postgres database
- **db:migrate**: migrate Postgres database
- **dynamodb:up**: start Docker DynamoDB container for local development
- **sonarqube:up**: start Docker SonarQube container for local static code analysis
- **sonarqube-verify**: start Static Code Analysis
- **containers:down**: stop all containers

## Deployment information

1. Preparation
   - Install `nvm`\
     Linux, OSX: https://github.com/nvm-sh/nvm \
     Windows: https://github.com/coreybutler/nvm-windows
   - Install `Node.js` _Recommended For Most Users_ version (12.18.4 for now) using nvm \
     Linux, OSX: https://github.com/nvm-sh/nvm#usage \
     Windows: https://github.com/coreybutler/nvm-windows#usage
     ```
     nvm install 12.18.4
     nvm use 12.18.4
     ```
   - Install `aws-cli` version 2 \
     Linux: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html \
     Windows: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html \
     OSX: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html
   - Install `Serverless framework` globally via npm \
     https://serverless.com/framework/docs/getting-started/
     ```
     npm install -g serverless
     ```
   - Create AWS user with at least programmatic access. It will be better to use a user with the Admin access.
     Download user's credentials.\
     Set up `AWS credentials` according to `Serverless framework` documentation. \
     Name the profile as it named in the `env.yml -> PROFILE` field. \
     https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/
     ```
     serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY --profile PROFILE
     ```
   - Install `git` https://git-scm.com/downloads
   - If the repository is private you should set up SSH key or use HTTPS for cloning it
   - Clone the repository
   - Install node_modules running the command in the root of the project
     ```
     npm i
     ```
2. Set up environment variables

   - Open env.yml file, you can see stage sections here. For example, `local`, `dev`, and `prod`.
     If you deploy on production use `prod` section and do not touch other sections.
   - Input your AWS region, for example, `us-east-1`
   - Go to AWS Console `Key Management Service` and create Symmetric key in your region
   - In the root folder of the project create kms_key.yml file and copy your key (Key ID) here like
     ```
     key: your_key_here
     ```
   - You can add any environment variables. If you need to secure them, encrypt them.
   - Copy the value of variable and run the command in the root of the project
     ```
     sls env --attribute VARIABLE_NAME --value variable_value --stage your_stage --encrypt
     ```
   - If you use some common variables, like

     ```yaml
     common: &common
       REGION: us-east-1
       PROFILE: default
       CLIENT: FLO

     local:
       <<: *common
     ```

     The plugin will add this variables to all stages, but we don't want it.
     So after encrypting, copy encrypted value of the new variable,
     revert changes and paste it to the right place.

   - You are ready for deploying

3. Deploy
   - Run the command in the root of the project
     ```
     npm run deploy:your_stage
     ```

### The project contains:

- The Media Info feature that uses mediainfo binary file and returns media info by url
- Examples of offline plugins and docker-compose file for working
  with AWS resources offline
- Examples of IAM Role Statements
- Example of different AWS resources
- Examples of models for dynamoose library
- Examples of models for sequelize library
- Examples of services for working with AWS resources
- Simple CircleCI configuration

### Project structure

- .circleci - Configuration for CI/CD
- api - Code of the features or CRUD operations of entities
  - feature_name - Code of one feature or CRUD operations of one entity.
    It should cover the area of one responsibility. For example, Media Info feature,
    CRUD operations (create, remove, update, delete) for user entity
    - handler.ts - This is a handler file. It should contain Lambda functions for one feature.
      For example, Media Info feature or CRUD operations for the user entity.
    - feature_name.manager.ts - It's the feature manager. Its methods should implement some feature's functionality
    - feature_name.service.ts - It's the feature service. Its methods should implement one of the main steps of some feature's functionality
    - feature_name.interface.ts - This file should contain all required interfaces for the feature
- bin - Executable files (third party libraries that can be used inside a Lambda function)
- helper - All auxiliary code
  - app-errors.ts - This file contains the class that derives from Node.js Error class.
    It should be used for providing custom errors with the proper structure
  - error-handler.ts - This file contains the class that helps handle errors
  - helper.ts - This file contains auxiliary functions
  - logger.ts - This file contains log function that helps log data in the proper way
- models - Models for the databases
  - user.model.ts
  - job.model.ts
- serverless - YAML files for description Serverless resources
  - functions - YAML files for description Lambda function with their triggers
    - FeatureName.yml - YAML file for description Lambda functions with their triggers for one feature
  - resources - YAML files for description resources like S3 buckets, SQS, DynamoDB tables, etc.
    - APIGateway.yml
    - Buckets.yml
    - ElasticSearch.yml
    - SQS.yml
    - Tables.yml
- services - Classes for working with third party libraries, APIs, services, etc.
  - cloud-formation.service.ts
  - email.service.ts
  - s3.service.ts
- env.yml - Environment variables
- package.json
- README.md
- serverless.yml - Contains the main description of the service
- webpack.config.json
- sonar-project.properties - Contains the configuration for static code analysis

## Static code analysis

- Start SonarQube docker container with command `npm run sonarqube:up`
- Start tests with command `npm run test`
- Start analysis with command `npm run sonarqube-verify`
- Go to http://localhost:9000
- Log in with _admin/admin_ credentials
- Now you can see the project's report

## How to add evn variable

Read this https://github.com/DieProduktMacher/serverless-env-generator

Add kms_key.yml file with `key` field and your KMS Id to the root.

### In short:

#### Viewing environment variables

Use the following commands to read and decrypt variables from your YAML environment files:

#### List variables

```sh
serverless env
serverless env --stage $STAGE
```

#### View one variable

```sh
serverless env --attribute $NAME
serverless env --attribute $NAME --stage $STAGE

#shorthand:
sls env -a $NAME
sls env -a $NAME -s $STAGE
```

#### Decrypt variables

```sh
serverless env --decrypt
serverless env --attribute $NAME --decrypt
serverless env --attribute $NAME --stage $STAGE --decrypt

#shorthand:
sls env -a $NAME --decrypt
sls env -a $NAME -s $STAGE -d
```

#### Setting environment variables

Use the following commands to store and encrypt variables in your YAML environment files:

Note that variables are stored to the first file listed in _envFiles_.

#### Set a variable

```sh
serverless env --attribute $NAME --value $PLAINTEXT
serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE

#shorthand:
sls env -a $NAME -v $PLAINTEXT
sls env --a $NAME -v $PLAINTEXT --s $STAGE
```

#### Set and encrypt a variable

```sh
serverless env --attribute $NAME --value $PLAINTEXT --encrypt
serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE --encrypt

#shorthand:
sls env -a $NAME -v $PLAINTEXT -e
sls env -a $NAME -v $PLAINTEXT -s $STAGE -e
```
