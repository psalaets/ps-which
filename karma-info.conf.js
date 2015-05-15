var baseConfig = require('./karma-base.conf');

module.exports = function(config) {
  baseConfig.files.splice(1, 0, 'test/info-test.js');
  config.set(baseConfig);
};
