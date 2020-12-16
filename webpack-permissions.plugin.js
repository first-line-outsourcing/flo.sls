const fs = require('fs');
const path = require('path');

/**
 * This Plugin sets the permissions to the directoryPath after webpack build the service
 * @constructor
 * @param options: { permissions: string,  directoryPath: string }
 */
class WebpackPermissionsPlugin {
  options;
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('Webpack Permissions Plugin', (stats) => {
      const permissions = this.options.permissions || '755';
      const directoryPath = this.options.directoryPath || 'bin';
      const permissionPath = path.join(compiler.outputPath, directoryPath);
      fs.readdirSync(permissionPath).map((item) => {
        fs.chmodSync(path.join(permissionPath, item), permissions);
      });
    });
  }
}

module.exports = WebpackPermissionsPlugin;
