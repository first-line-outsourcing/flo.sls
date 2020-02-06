# Serverless API for Toolset Service

## NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment

## How to add evn variable

Read this https://github.com/DieProduktMacher/serverless-env-generator

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
