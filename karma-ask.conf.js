var baseConfig = require('./karma-base.conf');

module.exports = function(config) {
  baseConfig.files.splice(1, 0, 'test/ask-test.js');
  baseConfig.logLevel = config.LOG_INFO;
  config.set(baseConfig);
};
