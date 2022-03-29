const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuildPluginTsc = require('@emarketeer/esbuild-plugin-tsc');

module.exports = (sls) => {
  return [nodeExternalsPlugin(), esbuildPluginTsc()];
};
