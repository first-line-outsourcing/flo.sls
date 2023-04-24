# Serverless app template (AWS)

## Project information

PROJECT INFORMATION HERE

### Links

- [Initial requirements](https://example.com)
- LINKS HERE

## Contacts

- MY NAME <my@email.com> (position)

## NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment
- **sls:package:dev**: package code using sls package command for dev stage
- **sls:package:test**: package code using sls package command for dev stage
- **sls:package:prod**: package code using sls package command for prod stage
- **sls:print:dev**: print sls config for dev stage
- **sls:print:test**: print sls config for test test
- **sls:print:prod**: print sls config for prod test
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

### AWS IAM Deployment Policy

To deploy to production, it is necessary to create an AWS IAM user and attach a deployment policy that allows actions on project resources or on resources with a project prefix.

To prepare the project deployment policy, use the base policy located in the `config/serverless/aws-deployment-policy/base.json` file, and add any necessary statements. Ensure that you replace the following placeholders in the policy:
- `PROJECT-PREFIX` with the actual project resource prefix
- `AWS_REGION` with the AWS region
- `AWS_ACCOUNT` with the AWS account number
- `AWS_KMS_KEY` with the AWS KMS key ID

Once you have prepared the deployment policy, save it as a JSON file in `config/serverless/aws-deployment-policy/` with the name `stage.<STAGE>.json`, where `<STAGE>` represents the name of the stage the policy is for. When the policy is ready, request that the AWS deployment account vendor creates an IAM user and attaches the prepared policy to it.

For development or test stages, the above steps can be omitted, and an IAM user with admin rights can be used instead.

After completing the deployment IAM user setup, proceed to the next section to create an AWS profile with the serverless framework.


### Installing tools

To prepare for deployment, follow these steps:

1. Install nvm by visiting the following links:
  * For Linux and OSX: https://github.com/nvm-sh/nvm
  * For Windows: https://github.com/coreybutler/nvm-windows

2. In the root of the project, run the following command to install the appropriate version of Node.Js from .nvmrc:
    ```
    nvm install
    ```

3. Install aws-cli version 2 by visiting the following links:
  * For Linux: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
  * For Windows: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html
  * For OSX: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html

4. Install the [Serverless framework](https://serverless.com/framework/docs/getting-started/) globally via npm by running the following command:
    ```
    npm install -g serverless
    ```

6. Set up AWS credentials according to the [Serverless framework documentation](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/). The name of the profile must match the `PROFILE` serverless parameter in the `provider` section of the `serverless.yml` file for the corresponding stage. Here's an example command for configuring a profile:

    ```
    serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY --profile PROFILE
    ```

7. Install `git` from https://git-scm.com/downloads.

8. If the repository is private, you should set up an SSH key or use HTTPS to clone it.

9. Clone the repository.

10. Install the required `node_modules` by running the following command in the root of the project:
    ```
    npm i
    ```


### 2. Set up environment variables

To set up environment variables:

1. Open the `env.yml` file, which contains sections for different stages (`local`, `dev`, `prod`, etc.). If you're deploying to production, use the `prod` section and don't modify the other sections.
2. In the AWS Console, go to `Key Management Service` and create a symmetric key in your region (or use an existing one).
3.  In the root folder of the project, create a `kms_key.yml` file and add your key ID for each stage, like this:
    ```
    ${stage}: your_key_here
    ```

The `stage` variable can be set to `local`, `dev`, `test`, or `prod`. You can find a full list of supported stages in the `custom.envEncryptionKeyId` section of the `serverless.ts` config.
4. You can add environment variables that will be shared across all Lambda functions. For more information on how to encrypt environment variables with KMS, see the [Set and encrypt variable](#set-and-encrypt-a-variable) section. Also, check the [FAQ](#faq) section for recommendations on when to use environment variables and [Serverless parameters](https://www.serverless.com/framework/docs/guides/parameters).



### PROJECT SPECIFIC ACTIONS BEFORE DEPLOYING

**If there are any project-specific actions that need to be taken before deploying, they should be listed in this section. Examples of such actions could include building specific dependencies or ensuring certain settings are properly configured for the deployment environment. It is important to document these actions clearly to ensure smooth and error-free deployment.**

### Deploy

To deploy your project, please follow these steps:

Run the following command in the root of the project, replacing STAGE_NAME with the name of the stage you want to deploy:

```
npm run deploy:STAGE_NAME
```

Wait for the deployment process to complete. You can monitor the progress of your deployment in your command terminal or by checking the logs generated during the deployment process.

That's it! Your project should now be deployed and ready to use.

### Project structure

- .circleci - Configuration for CI/CD
- api - Code of the features or CRUD operations of entities
  - feature_name - Code of one feature or CRUD operations of one entity. It should cover the area of one
    responsibility. For example, Media Info feature, CRUD operations (create, remove, update, delete) for user entity
    - handler.ts - This is a handler file. It should contain Lambda functions for one feature. For example, Media
      Info feature or CRUD operations for the user entity.
    - feature_name.manager.ts - It's the feature manager. Its methods should implement some feature's functionality
    - feature_name.service.ts - It's the feature service. Its methods should implement one of the main steps of some
      feature's functionality
    - feature_name.interface.ts - This file should contain all required interfaces for the feature
- bin - Executable files (third party libraries that can be used inside a Lambda function)
- config - Folder for configurations
  - serverless - TypeScript files for the description of Serverless resources
    - parts - TypeScript files for the description of Lambda function with their triggers and resources like S3 buckets, SQS, DynamoDB tables, etc.
      - examples.ts - TypeScript file for description Lambda functions with their triggers for one feature
      - feature.ts - TypeScript file for description Lambda functions with their triggers for one feature
      - rest-api-cors.ts - Helper for setting up CORS for REST API
      - jobs.ts - TypeScript file for description of DynamoDB table
      - users.ts - TypeScript file for description of DynamoDB table
    - cf-intristic-fn.ts - Helper with function for CloudFormation
    - types.ts - Types for Serverless configurations
    - utils.ts - Helper for Serverless configurations
- helper - All auxiliary code
  - http-api/ - Helpers for HTTP API
  - rest-api/ - Helpers for REST API
  - base-error-handler.ts - Base for building error handlers. Normally you should not use it in lambda.
  - environment.ts - Helper for working with environment variables
  - helper.ts - This file contains auxiliary functions
  - logger.ts - This file contains log function that helps log data in the proper way
- interfaces
- examples - Examples
- services - Classes for working with third party libraries, APIs, services, etc.
- docker-compose.yml
- env.yml - Environment variables
- package.json
- README.md
- serverless.ts - Contains the main description of the service
- sonar-project.properties - Contains the configuration for static code analysis
- tsconfig.json
- loadenv.ts - load environment variable from `.env` file
- esbuild-pluings.js - load pluings for esbuild

## Examples

If you would like to experiment with the examples, please follow these steps:

1. Add all the contents of the `examples/` directory to the project root.
2. Update the `package.json` file with the contents of `examples/package.json`.
3. Update the `docker-compose.yaml` file with the contents of `examples/docker-compose.yaml`.

Please note that for a real project, the `examples/` directory should be deleted.

Here is a list of available examples:
- **Media Info**: This feature uses the `mediainfo` binary file and returns media information by URL.
- **Offline plugins and Docker Compose file**: This is for working with AWS resources offline.
- **HTTP API and REST API endpoints with authorizers**
- **IAM Role Statements**
- **AWS resources**
- **Models for the dynamoose library**
- **Models for the sequelize library**
- **Services for working with AWS resources**


## Static Code Analysis

To perform static code analysis, please follow these steps:

1. Start the SonarQube docker container by running the command `npm run sonarqube:up`.
2. Run the tests using the command `npm run test`.
3. Perform the analysis using the command `npm run sonarqube-verify`.
4. Open your web browser and go to http://localhost:9000.
5. Log in using the credentials _admin/admin_.
6. You should now be able to see the project's report.


### Troubleshooting

If you encounter the error message `Not authorized. Analyzing this project requires authentication. Please provide a user token in sonar.login or other credentials in sonar.login and sonar.password.`, please follow these steps:

1. Go to the `Administration` menu in the header.
2. Select `Security`.
3. Scroll down and turn off `Force user authentication`.
4. Note that this should only be done for local usage.


## How to Add an Environment Variable

In this project, we have used https://github.com/org-redtea/serverless-env-generator, which is a fork of https://github.com/DieProduktMacher/serverless-env-generator.

There are some caveats to keep in mind when using this plugin:

- The shorthand `-v` does not work for either the original plugin or the forked version.
- The shorthand `-c` does not work.

To add an `env` variable, follow these steps:

1. Create a `kms_key.yml` file with `${stage}` field and your KMS Id in the root directory. For example:

    ```YAML
    local: xxx
    dev: xxx
    test: xxx
    prod: xxx
    ```

2. Use the following commands to read and decrypt variables from your YAML environment files:

  - List all variables:

      ```sh
      serverless env
      serverless env --stage $STAGE
      ```

  - View one variable:

      ```sh
      serverless env --attribute $NAME
      serverless env --attribute $NAME --stage $STAGE

      # shorthand:
      sls env -a $NAME
      sls env -a $NAME -s $STAGE
      ```

  - Decrypt variables:

      ```sh
      serverless env --decrypt
      serverless env --attribute $NAME --decrypt
      serverless env --attribute $NAME --stage $STAGE --decrypt

      # shorthand:
      sls env -a $NAME --decrypt
      sls env -a $NAME -s $STAGE -d
      ```

3. Use the following commands to store and encrypt variables in your YAML environment files.

  - Set a variable:

      ```sh
      serverless env --attribute $NAME --value $PLAINTEXT
      serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE

      # shorthand:
      sls env -a $NAME --value $PLAINTEXT
      sls env -a $NAME --value $PLAINTEXT --s $STAGE
      ```

  - Set and encrypt a variable:

      ```sh
      serverless env --attribute $NAME --value $PLAINTEXT --encrypt
      serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE --encrypt

      # shorthand:
      sls env -a $NAME --value $PLAINTEXT -e
      sls env -a $NAME --value $PLAINTEXT -s $STAGE -e
      ```

  - Set the value of an attribute in an anchor:

      ```sh
      serverless env --anchor $ANHOR --attribute $NAME --value $PLAINTEXT

      # shorthand:
      sls env --anchor $ANHOR -a $NAME --value $PLAINTEXT
      ```

Assuming you have the following `env.yml`:

```YAML
common:
  &common
  VAR: "1"

local:
  <<: *common
dev:
  <<: *common

test:
  <<: *common

prod:
  <<: *common
```

The result of the command:

```
$ sls env --attribute VAR --anchor common --value 2
```

will be:

```
common:
  &common
  VAR: "2"

local:
  <<: *common
dev:
  <<: *common

test:
  <<: *common

prod:
  <<: *common
```

## FAQ

### Which API Gateway event type should be used with Lambda: REST API or HTTP API?

In most cases, it's recommended to use the HTTP API as it is the best and most cost-effective option. However, in certain situations, it may be necessary to use the REST API instead. To determine which option is best for your use case, refer to [this page](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html) which outlines the key differences between HTTP API and REST API.

For more information about configuring the REST API event with the Serverless Framework, please refer to [this link](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

For more information about configuring the HTTP API event with the Serverless Framework, please refer to [this link](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

# "Serverless Offline only supports retrieving JWT from the headers (undefined)" error when trying to start offline

If you are encountering this error, it is likely that you are using a Lambda authorizer for an HTTP API. Please note that the Serverless Offline plugin does not yet support Lambda authorizers.

You may want to check the plugin repository for any updates or alternative solutions to this issue.

## What to use: `env.yml` or [params](https://www.serverless.com/framework/docs/guides/parameters#stage-parameters)?

When configuring a serverless application, you can choose between using `env.yml` or [Serverless stage parameters](https://www.serverless.com/framework/docs/guides/parameters#stage-parameters) to manage environment variables.

Stage parameters allow you to pass different values of a parameter depending on the stage. These parameters can be used as a value source for environment variables for the Lambda function, as shown in the TypeScript example below:

```typescript
const serverlessConfig: AWS = {
  ...
  params: {
    dev: {
      MY_PARAM: '1',
    },
    prod: {
      MY_PARAM: '2',
    },
  },
  provider: {
    environment: {
      MY_PARAM: '${param:MY_PARAM}',
    },
  },
  ...
}
```

On the other hand, `env.yml` is used to store encrypted environment variables, as well as any other variables that will be passed to the Lambda function on deployment. You can also use it in the serverless config as a parameter, like this:

```
const serverlessConfig: AWS = {
  ...
  provider: {
    tags: {
      MY_TAG: `${file(./env.yml):${self:provider.stage}.MY_TAG}`,
    },
  },
  ...
}
```

If you want to avoid passing all variables and parameters to the Lambda function, it is recommended to use stage parameters instead.

Here are some recommendations to follow when using these options in your project:

 - Use stage parameters to substitute values in the serverless config. These parameters will not be passed to the Lambda function and will only be visible in the serverless config.
 - Use `env.yml` to store encrypted environment variables, encrypted parameters, and any other environment variable or parameter. Keep in mind that all variables/parameters in the YAML file will be passed to each Lambda function as environment variables.
 - Use stage parameters as a value source for Lambda environment variables if you only have a few variables.

### Can I use the `aws-sdk` package with Node.js 18?

No, you cannot use the `aws-sdk` package with Node.js 18 in the AWS Lambda environment. The environment only supports AWS SDK v3 (`@aws-sdk/*`). You can check out this [blog post](https://aws.amazon.com/blogs/compute/node-js-18-x-runtime-now-available-in-aws-lambda/) for more information.


