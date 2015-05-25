(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.psWhich = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = ModuleContents;

function ModuleContents() {
  this.values = [];
  this.constants = [];
  this.factories = [];
  this.services = [];
  this.directives = [];
  this.providers = [];
  this.controllers = [];
}

ModuleContents.prototype = {
  whatTypes: function(name) {
    var types = [];

    this.values.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('value');
    });

    this.constants.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('constant');
    });

    this.factories.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('factory');
    });

    this.services.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('service');
    });

    this.directives.filter(function(current) {
      return current === name || camelToDashed(current) === name;
    }).forEach(function() {
      types.push('directive');
    });

    this.providers.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('provider');
    });

    this.controllers.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('controller');
    });

    return types;
  },
  hasAny: function() {
    return this.values.length +
      this.constants.length +
      this.factories.length +
      this.services.length +
      this.directives.length +
      this.providers.length +
      this.controllers.length > 0;
  }
};

function camelToDashed(camelCase) {
  return camelCase.replace(/[A-Z]/g, function(match) {
    return '-' + match.toLowerCase();
  });
}
},{}],2:[function(require,module,exports){
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
},{"./lib/module-contents":1}]},{},[2])(2)
});