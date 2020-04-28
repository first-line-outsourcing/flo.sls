# Serverless API for your application

## NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment
- **lint**: start tslint for project files
- **test**: start unit tests
- **test:ci**: start test in CI environment
- **sqs:up**: start Docker SQS container for local development
- **postgres:up**: start Docker Postgres container for local development
- **dynamodb:up**: start Docker DynamoDB container for local development

## Project information

It is a skeleton for your Serverless applications. It uses typescript,
webpack dir-config plugin for Serverless function and resources and env
plugin for encrypted environment variables.

### It contains:

- The basic Lambda function Hello with examples of triggers
- Examples of offline plugins and docker-compose file for working
  with AWS resources offline
- Examples of IAM Role Statements
- Example of different AWS resources
- Examples of models for dynamoose library
- Examples of services for working with AWS resources
- Simple CircleCI configuration
## How to add evn variable

Read this https://github.com/DieProduktMacher/serverless-env-generator
Add kms_key.yml file with `key` field and your KMS Id to the root.

## In short:

### Viewing environment variables

Use the following commands to read and decrypt variables from your YAML environment files:

### List variables

```sh
serverless env
serverless env --stage $STAGE
```

### View one variable

```sh
serverless env --attribute $NAME
serverless env --attribute $NAME --stage $STAGE

#shorthand:
sls env -a $NAME
sls env -a $NAME -s $STAGE
```

### Decrypt variables

```sh
serverless env --decrypt
serverless env --attribute $NAME --decrypt
serverless env --attribute $NAME --stage $STAGE --decrypt

#shorthand:
sls env -a $NAME --decrypt
sls env -a $NAME -s $STAGE -d
```

### Setting environment variables

Use the following commands to store and encrypt variables in your YAML environment files:

Note that variables are stored to the first file listed in _envFiles_.

### Set a variable

```sh
serverless env --attribute $NAME --value $PLAINTEXT
serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE

#shorthand:
sls env -a $NAME -v $PLAINTEXT
sls env --a $NAME -v $PLAINTEXT --s $STAGE
```

### Set and encrypt a variable

```sh
serverless env --attribute $NAME --value $PLAINTEXT --encrypt
serverless env --attribute $NAME --value $PLAINTEXT --stage $STAGE --encrypt

#shorthand:
sls env -a $NAME -v $PLAINTEXT -e
sls env -a $NAME -v $PLAINTEXT -s $STAGE -e
```
