;(function(global) {
  global.psWhich = psWhich;

  var info = psWhich.info = {};

  function psWhich(angular) {
    var origModule = angular.module;

    angular.module = function moduleWrapper(moduleName, requires) {
      var result = origModule.apply(angular, arguments);

      if (requires) {
        hookIntoModule(moduleName, result);
      }

      return result;
    };
  }

  function hookIntoModule(moduleName, module) {
    var index = info[moduleName] = createModuleIndex();

    recordNames('factory',    index.factories);
    recordNames('value',      index.values);
    recordNames('constant',   index.constants);
    recordNames('service',    index.services);
    recordNames('directive',  index.directives);
    recordNames('provider',   index.providers);

    function recordNames(methodName, record) {
      var orig = module[methodName];

      module[methodName] = function(name) {
        record.push(name);
        return orig.apply(module, arguments);
      };
    }
  }

  function createModuleIndex() {
    return {
      factories: [],
      values: [],
      constants: [],
      services: [],
      directives: [],
      providers: []
    };
  }
})(this);