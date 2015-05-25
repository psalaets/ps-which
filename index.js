var ModuleContents = require('./lib/module-contents');

// export main func so browserify can do its umd thing
module.exports = psWhich;

// expose as global no matter the environment, this is how ps-which is accessed
window.psWhich = psWhich;

// automatically hook into angular if it's available as a global
if (typeof angular != 'undefined') {
  psWhich(angular);
}

/**
* Adds hooks to Angular.
*
* @param angular - main angular object
*/
function psWhich(angular) {
  var orig = angular.module;

  angular.module = function moduleReplacement(moduleName, requires) {
    var module = orig.apply(angular, arguments);

    if (requires) {
      hookIntoModule(moduleName, module);
    }

    return module;
  };
}

var info = psWhich.info = {};

/**
* Add hooks to an Angular module.
*
* @param moduleName - name of the module
* @param module     - the module to hook in to
*/
function hookIntoModule(moduleName, module) {
  var index = info[moduleName] = new ModuleContents();

  recordNames('factory',    index.factories);
  recordNames('value',      index.values);
  recordNames('constant',   index.constants);
  recordNames('service',    index.services);
  recordNames('directive',  index.directives);
  recordNames('provider',   index.providers);
  recordNames('controller', index.controllers);

  function recordNames(methodName, names) {
    var orig = module[methodName];

    module[methodName] = function(name) {
      names.push(name);
      return orig.apply(module, arguments);
    };
  }
}

/**
* Print all info gathered thus far to console in a markdown-looking format.
*/
psWhich.report = function report(filter) {
  var log = console.log.bind(console);

  function filterFn(moduleName) {
    if (!filter) {
      return true;
    }
    return filter.test(moduleName);
  }

  Object.keys(psWhich.info).sort().filter(filterFn).forEach(function(moduleName) {
    var moduleInfo = psWhich.info[moduleName];

    log('# ' + moduleName);

    if (moduleInfo.hasAny()) {
      logSection('factory',     info[moduleName].factories);
      logSection('value',       info[moduleName].values);
      logSection('constant',    info[moduleName].constants);
      logSection('service',     info[moduleName].services);
      logSection('directive',   info[moduleName].directives);
      logSection('provider',    info[moduleName].providers);
      logSection('controller',  info[moduleName].controllers);
    } else {
      log('(empty)');
    }
    log();
  });

  function logSection(sectionName, names) {
    if (names.length == 0) return;

    log('## ' + sectionName);
    names.forEach(function(name) {
      log('- ' + name);
    });
  }
}

/**
* See what exists for a given name.
*
* @param name - name to look for
* @return message about what was found
*/
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
    return 'not found';
  }
};