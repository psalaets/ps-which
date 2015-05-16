var baseConfig = require('./karma-base.conf');

module.exports = function(config) {
  baseConfig.files.push('test/ask-test.js');
  baseConfig.logLevel = config.LOG_INFO;
  config.set(baseConfig);
};
