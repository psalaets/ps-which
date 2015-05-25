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