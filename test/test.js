describe('after hooking into Angular', function() {
  beforeAll(function() {
    psWhich(angular);
    angular.module('moduleA', []);
    angular.module('moduleB', []);
  });

  it('has undefined info for modules that haven\t been defined', function() {
    expect(psWhich.info.moduleX).toBeUndefined();
  });

  it('has empty arrays for modules that don\'t have anything', function() {
    expect(psWhich.info.moduleA.factories.length).toBe(0);
    expect(psWhich.info.moduleA.values.length).toBe(0);
    expect(psWhich.info.moduleA.constants.length).toBe(0);
    expect(psWhich.info.moduleA.services.length).toBe(0);
    expect(psWhich.info.moduleA.directives.length).toBe(0);
    expect(psWhich.info.moduleA.providers.length).toBe(0);
  });

  it('records factories added to Angular modules', function() {
    function myFactory() { return {}; }

    angular.module('moduleA').factory('f1', myFactory);
    angular.module('moduleA').factory('f2', myFactory);

    angular.module('moduleB').factory('f3', myFactory);

    expect(psWhich.info.moduleA.factories).toEqual(['f1', 'f2']);
    expect(psWhich.info.moduleB.factories).toEqual(['f3']);
  });

  it('records values added to Angular modules', function() {
    angular.module('moduleA').value('v1', 1);
    angular.module('moduleA').value('v2', 2);

    angular.module('moduleB').value('v3', 3);

    expect(psWhich.info.moduleA.values).toEqual(['v1', 'v2']);
    expect(psWhich.info.moduleB.values).toEqual(['v3']);
  });

  it('records constants added to Angular modules', function() {
    angular.module('moduleA').constant('c1', 1);
    angular.module('moduleA').constant('c2', 2);

    angular.module('moduleB').constant('c3', 3);

    expect(psWhich.info.moduleA.constants).toEqual(['c1', 'c2']);
    expect(psWhich.info.moduleB.constants).toEqual(['c3']);
  });

  it('records services added to Angular modules', function() {
    function MyService() {}

    angular.module('moduleA').service('s1', MyService);
    angular.module('moduleA').service('s2', MyService);

    angular.module('moduleB').service('s3', MyService);

    expect(psWhich.info.moduleA.services).toEqual(['s1', 's2']);
    expect(psWhich.info.moduleB.services).toEqual(['s3']);
  });

  it('records directives added to Angular modules', function() {
    function myDirective() { return {}; }

    angular.module('moduleA').directive('d1', myDirective);
    angular.module('moduleA').directive('d2', myDirective);

    angular.module('moduleB').directive('d3', myDirective);

    expect(psWhich.info.moduleA.directives).toEqual(['d1', 'd2']);
    expect(psWhich.info.moduleB.directives).toEqual(['d3']);
  });
});