describe('psWhich.ask(name)', function () {
  it('answers for non-existing type', function() {
    var answer = psWhich.ask('_does_not_exist_');

    expect(answer).toBe('not found');
  });

  it('answers for existing value', function() {
    angular.module('moduleA', []);

    angular.module('moduleA').value('v1', 3);

    var answer = psWhich.ask('v1');

    expect(answer).toBe('value in moduleA');
  });

  it('answers for existing constant', function() {
    angular.module('moduleB', []);

    angular.module('moduleB').constant('c1', 3);

    var answer = psWhich.ask('c1');

    expect(answer).toBe('constant in moduleB');
  });

  it('answers for existing factory', function() {
    angular.module('moduleC', []);

    angular.module('moduleC').factory('f1', function() { return 'a'; });

    var answer = psWhich.ask('f1');

    expect(answer).toBe('factory in moduleC');
  });

  it('answers for existing service', function() {
    angular.module('moduleD', []);

    angular.module('moduleD').service('s1', function() {});

    var answer = psWhich.ask('s1');

    expect(answer).toBe('service in moduleD');
  });

  it('answers for existing directive', function() {
    angular.module('moduleE', []);

    angular.module('moduleE').directive('d1', function() { return {}; });

    var answer = psWhich.ask('d1');

    expect(answer).toBe('directive in moduleE');
  });

  it('answers for existing provider', function() {
    function provider() { this.$get = function() { return 2; }; }
    angular.module('moduleF', []);

    angular.module('moduleF').provider('p1', provider);

    var answer = psWhich.ask('p1');

    expect(answer).toBe('provider in moduleF');
  });

  it('answers for type defined more than once', function() {
    angular.module('moduleG', []);
    angular.module('moduleH', []);

    angular.module('moduleG').value('v2', 3);
    angular.module('moduleH').value('v2', 4);

    var answer = psWhich.ask('v2');

    expect(answer).toBe('value in moduleG, value in moduleH');
  });

  it('answers for name used multiple times as different types', function() {
    angular.module('moduleI', []);
    angular.module('moduleJ', []);

    angular.module('moduleI').value('v3', 3);
    angular.module('moduleJ').constant('v3', 4);

    var answer = psWhich.ask('v3');

    expect(answer).toBe('value in moduleI, constant in moduleJ');
  });

  it('answers for existing directive in dashed format', function() {
    angular.module('moduleK', []);

    angular.module('moduleK').directive('myDirective', function() { return {}; });

    var answer = psWhich.ask('my-directive');

    expect(answer).toBe('directive in moduleK');
  });
});