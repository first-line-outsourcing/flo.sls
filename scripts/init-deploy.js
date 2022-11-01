/**
 * It checks whether the service is deployed and if not then
 * creates records in the SSM parameters storage.
 */

const awsSdk = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const util = require('util');
const cp = require('child_process');

const [env] = process.argv.slice(2);
const cwd = process.cwd();
let ssm;
let envs;

console.log('env=%s', env);

if (!env) {
  throw new Error('Provide env as CLI argument: node <this script> <env>');
}

main();

async function main() {
  // Load all env vars from the env.yaml into `envs` variable
  loadEnvs();

  awsSdk.config.credentials = new awsSdk.SharedIniFileCredentials({
    profile: envs.PROFILE,
  });
  awsSdk.config.region = envs.REGION;

  // Initialize SSM client
  ssm = new awsSdk.SSM();

  // Service is already deployed
  if (!(await shouldRun())) {
    console.log('Skip');
    return;
  }

  try {
    // Create the parameter for iconik APP ID
    await ssm
      .putParameter({
        Name: createParamPath('iconik-credentials', 'app-id'),
        Type: 'String',
        Value: envs.ICONIK_APP_ID,
        Overwrite: true,
      })
      .promise();

    // Create the parameter for iconik APP AUTH TOKEN
    await ssm
      .putParameter({
        Name: createParamPath('iconik-credentials', 'app-auth-token'),
        Value: envs.ICONIK_APP_AUTH_TOKEN,
        Overwrite: true,
        Type: 'SecureString',
      })
      .promise();

    // Create the parameter to check deployment status
    await ssm
      .putParameter({
        Name: createParamPath('service-admin', 'deployed'),
        Type: 'String',
        Value: 'true',
        Overwrite: true,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update SSM parameters.');
  }

  console.log('Done');
}

async function shouldRun() {
  try {
    const v = await ssm
      .getParameter({
        Name: createParamPath('service-admin', 'deployed'),
      })
      .promise();

    return v.Parameter?.Value !== 'true';
  } catch (error) {
    if (error.code === 'ParameterNotFound') {
      return true;
    }
    console.error(error);
    throw new Error('Unable to get a SSM parameter');
  }
}

function loadEnvs() {
  try {
    let {stderr: out} = cp.spawnSync(
      'node',
      [path.join(cwd, 'node_modules/.bin/sls')].concat(['env', '--stage', env, '-d']),
      {
        env: {
          ...process.env,
          STAGE: env,
        },
      }
    );

    out = out.toString();
    envs = parseEnvs(out);
    envs.STAGE = env;
    out = cp.execFileSync(
      'node',
      [path.join(cwd, 'node_modules/.bin/sls')].concat(['print', '--stage', env, '--config', 'serverless.ts', '--format', 'json']),
      {
        env: {
          ...process.env,
          STAGE: env,
        },
      }
    );
    out = JSON.parse(out.toString());
    envs.REGION = getParam(out, 'REGION', env);
    envs.CLIENT = getParam(out, 'CLIENT', env);
    envs.PROFILE = getParam(out, 'PROFILE', env);
  } catch (error) {
    console.error(error);
    throw new Error('Unable to get envs');
  }
}

function getParam(config, name, stage) {
  const dest = config.params;
  if (dest[stage] && dest[stage][name] !== undefined) {
    return dest[stage][name];
  }
  return dest.default ? dest.default[name] : undefined;
}

function parseEnvs(str) {
  const lines = str.split(/\r\n|\r|\n/).slice(1);
  const output = lines.reduce((out, line) => {
    const result = line.match(/^  ([^:]+): (.+?)( \(encrypted\))?$/);
    if (result) {
      const [, key, value] = result;
      out[key] = value;
    }
    return out;
  }, {});
  return output;
}

function createParamPath(prefix, path) {
  return `/win/${envs.CLIENT}/${envs.SERVICE_NAME}/${envs.STAGE}/${prefix}/${path}`;
}
