var ModuleContents = require('./lib/module-contents');

module.exports = psWhich;

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
  var index = info[moduleName] = new ModuleContents();

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

psWhich.report = function report() {
  var log = console.log.bind(console);

  Object.keys(info).sort().forEach(function(moduleName) {
    log(moduleName);
    logSection('factory',   info[moduleName].factories);
    logSection('value',     info[moduleName].values);
    logSection('constant',  info[moduleName].constants);
    logSection('service',   info[moduleName].services);
    logSection('directive', info[moduleName].directives);
    logSection('provider',  info[moduleName].providers);
    log();
  });

  function logSection(sectionName, names) {
    log('  ' + sectionName + ':');
    names.forEach(function(name) {
      log('    - ' + name);
    });
  }
}

psWhich.ask = function ask(name) {
  var finds = [];
  var modules = Object.keys(info).sort();

  modules.forEach(function(module) {
    var index = info[module];

    index.whatTypes(name).forEach(function(type) {
      finds.push(type + ' in ' + module);
    });
  });

  if (finds.length > 0) {
    return finds.join(', ');
  } else {
    return 'nothing found';
  }
};