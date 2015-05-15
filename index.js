;(function(global) {
  global.psWhich = psWhich;

  function psWhich(angular) {
    var orig = angular.module;

    angular.module = function moduleWrapper(moduleName, requires) {
      var module = orig.apply(angular, arguments);

      if (requires) {
        hookIntoModule(moduleName, module);
      }

      return module;
    };
  }

  var info = psWhich.info = {};

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