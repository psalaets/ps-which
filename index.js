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

    function recordNames(methodName, names) {
      var orig = module[methodName];

      module[methodName] = function(name) {
        names.push(name);
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

  psWhich.report = function() {
    var log = console.log.bind(console);

    Object.keys(info).sort().forEach(function(moduleName) {
      log(moduleName);
      logSection('factory', info[moduleName].factories);
      logSection('value', info[moduleName].values);
      logSection('constant', info[moduleName].constants);
      logSection('service', info[moduleName].services);
      logSection('directive', info[moduleName].directives);
      logSection('provider', info[moduleName].providers);
      log();
    });

    function logSection(sectionName, names) {
      log('  ' + sectionName + ':');
      names.forEach(function(name) {
        log('    - ' + name);
      });
    }
  }
})(this);