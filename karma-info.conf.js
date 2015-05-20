var extend = require('extend');
var baseConfig = require('./karma-base.conf');

var localConfig = extend(true, {}, baseConfig);

module.exports = function(config) {
  localConfig.files.push('test/info-test.js');
  localConfig.logLevel = config.LOG_INFO;
  config.set(localConfig);
};
