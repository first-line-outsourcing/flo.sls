# Serverless API



# NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment

Add env.yml with following structure

local:
  IS_OFFLINE: 'true'
  ...
dev:
  IS_OFFLINE: 'false'
  ...
prod:
  IS_OFFLINE: 'false'
  ...

