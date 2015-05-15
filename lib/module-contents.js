module.exports = ModuleContents;

function ModuleContents() {
  this.values = [];
  this.constants = [];
  this.factories = [];
  this.services = [];
  this.directives = [];
  this.providers = [];
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
      return current === name;
    }).forEach(function() {
      types.push('directive');
    });

    this.providers.filter(function(current) {
      return current === name;
    }).forEach(function() {
      types.push('provider');
    });

    return types;
  }
};