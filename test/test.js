describe('after hooking into Angular', function() {
  beforeAll(function() {
    psWhich(angular);
    angular.module('moduleA', []);
    angular.module('moduleB', []);
  });

  it('records factories added to Angular modules', function() {
    angular.module('moduleA').factory('f1', function() {
      return {};
    });
    angular.module('moduleA').factory('f2', function() {
      return {};
    });

    angular.module('moduleB').factory('f3', function() {
      return {};
    });

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
});