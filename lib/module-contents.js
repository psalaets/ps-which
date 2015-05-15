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

    console.dir(this)

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

    return types;
  }
};