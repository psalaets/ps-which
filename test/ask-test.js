describe('psWhich.ask(name)', function () {
  beforeAll(function() {
    psWhich(angular);
  });

  it('tells about a non-existing Angular type', function() {
    var answer = psWhich.ask('_does_not_exist_');

    expect(answer).toBe('nothing found');
  });

  it('tells about an existing Angular type', function() {
    angular.module('moduleA', []);

    angular.module('moduleA').value('myValue', 3);

    var answer = psWhich.ask('myValue');

    expect(answer).toBe('value in moduleA');
  });

  it('tells about an Angular type defined more than once', function() {
    angular.module('moduleB', []);
    angular.module('moduleC', []);

    angular.module('moduleB').value('myValue', 3);
    angular.module('moduleC').value('myValue', 4);

    var answer = psWhich.ask('myValue');

    expect(answer).toBe('value in moduleB, value in moduleC');
  });
});