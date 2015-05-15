describe('psWhich.ask(name)', function () {
  beforeAll(function() {
    psWhich(angular);
  });

  it('answers for non-existing type', function() {
    var answer = psWhich.ask('_does_not_exist_');

    expect(answer).toBe('nothing found');
  });

  it('answers for existing type', function() {
    angular.module('moduleA', []);

    angular.module('moduleA').value('v1', 3);

    var answer = psWhich.ask('v1');

    expect(answer).toBe('value in moduleA');
  });

  it('answers for type defined more than once', function() {
    angular.module('moduleB', []);
    angular.module('moduleC', []);

    angular.module('moduleB').value('v2', 3);
    angular.module('moduleC').value('v2', 4);

    var answer = psWhich.ask('v2');

    expect(answer).toBe('value in moduleB, value in moduleC');
  });

  it('answers for name used multiple times as different types', function() {
    angular.module('moduleD', []);
    angular.module('moduleE', []);

    angular.module('moduleD').value('v3', 3);
    angular.module('moduleE').constant('v3', 4);

    var answer = psWhich.ask('v3');

    expect(answer).toBe('value in moduleD, constant in moduleE');
  });
});