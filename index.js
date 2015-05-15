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

    recordCalls('factory', 'factories');
    recordCalls('value', 'values');

    function recordCalls(methodName, indexCollectionName) {
      var orig = module[methodName];

      module[methodName] = function(name) {
        index[indexCollectionName].push(name);
        return orig.apply(module, arguments);
      };
    }
  }

  function createModuleIndex() {
    return {
      factories: [],
      values: [],
      directives: [],
      services: [],
      constants: [],
      providers: []
    };
  }
})(this);