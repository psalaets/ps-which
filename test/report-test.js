describe('psWhich.report()', function() {
  var buffer;

  beforeAll(function() {
    // replace config.log() for testing purposes
    console.log = function() {
      var args = Array.prototype.slice.apply(arguments);
      if (args.length == 0) {
        args.push('');
      }
      buffer.push.apply(buffer, args);
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

    angular.module('moduleC', []);

    psWhich.report();

    expect(buffer).toEqual([
      '# moduleA',
      '## value',
      '- v1',
      '',
      '# moduleB',
      '## constant',
      '- c1',
      '',
      '# moduleC',
      '(empty)',
      ''
    ]);
  });
});