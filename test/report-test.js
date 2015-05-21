describe('psWhich.report()', function() {
  var buffer;

  beforeAll(function() {
    // replace config.log() for testing purposes
    console.log = function() {
      buffer.push.apply(buffer, arguments);
    };
  });

  beforeEach(function() {
    buffer = [];
  });

  it('prints modules and lists of types they have', function() {
    angular.module('moduleA', []);
    angular.module('moduleA').value('v1', 3);

    angular.module('moduleB', []);
    angular.module('moduleB').constant('c1', 3);

    psWhich.report();

    expect(buffer).toEqual([
      '# moduleA',
      '## value',
      '- v1',
      '# moduleB',
      '## constant',
      '- c1'
    ]);
  });
});