const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = (sls) => {
  return [nodeExternalsPlugin(), esbuildPluginTsc()];
};
