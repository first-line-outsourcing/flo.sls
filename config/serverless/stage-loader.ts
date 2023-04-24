// Use this module to resolve stage name from SLS cli options or set default
// Import this module first
import resolveSlsCliInput from 'serverless/lib/cli/resolve-input.js';

if (!process.env.STAGE) {
  try {
    const cliInput = resolveSlsCliInput();
    if (cliInput && cliInput.options.stage) {
      console.info('Loaded stage from CLI input: %s', cliInput.options.stage);
      process.env.STAGE = cliInput.options.stage;
    }
  } catch (err) {
    console.error('Unable to resolve stage: %O', err);
  }
  if (!process.env.STAGE) {
    process.env.STAGE = 'dev';
  }
}
