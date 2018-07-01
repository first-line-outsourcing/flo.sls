const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

const destPath = path.join(__dirname, '.webpack');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: destPath,
    filename: '[name].js'
  },
  target: 'node',
  mode: "development",
  // we use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: [/\.(spec|e2e)\.ts$/]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
