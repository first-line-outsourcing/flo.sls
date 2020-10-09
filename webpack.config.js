const path = require('path');
const slsw = require('serverless-webpack');
const WebpackPermissionsPlugin = require('./webpack-permissions.plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const entries = {};
Object.keys(slsw.lib.entries).forEach((key) => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]]));

const destPath = path.join(__dirname, '.webpack');
module.exports = {
  entry: entries,
  output: {
    libraryTarget: 'commonjs',
    path: destPath,
    filename: '[name].js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: slsw.lib.options.stage === 'local' ? 'development' : 'production',
  // we use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [nodeExternals({ modulesDir: path.resolve(__dirname, './node_modules') })],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: [/\.(test|e2e)\.ts$/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin.TsconfigPathsPlugin({ configFile: path.resolve(__dirname, './tsconfig.json') })],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'bin', to: 'bin' }],
    }),
    new WebpackPermissionsPlugin(),
  ],
};
