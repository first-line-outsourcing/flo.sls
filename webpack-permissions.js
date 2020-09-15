const fs = require('fs');
const path = require('path');

/**
 * This module sets the permissions to the directoryPath after webpack build the service
 * @param options: { permissions: string,  directoryPath: string }
 * @constructor
 */

function WebpackPermission(options) {
  this.options = options || {};
}

WebpackPermission.prototype.apply = function (compiler) {
  compiler.plugin('done', () => {
    const permissions = this.options.permissions || '755';
    const directoryPath = this.options.directoryPath || 'bin';
    const permissionPath = path.join(compiler.outputPath, directoryPath);
    fs.readdirSync(permissionPath).map((item) => {
      fs.chmodSync(path.join(permissionPath, item), permissions);
    });
  });
};

module.exports = WebpackPermission;
