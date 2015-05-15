describe('after hooking into Angular', function() {
  beforeAll(function() {
    psWhich(angular);
  });

  describe('.info', function () {
    it('doesn\'t have anything for modules that haven\t been defined', function() {
      expect(psWhich.info.moduleX).toBeUndefined();
    });

    it('has empty arrays for modules that have been defined but don\'t have anything', function() {
      angular.module('moduleA', []);

      expect(psWhich.info.moduleA.factories.length).toBe(0);
      expect(psWhich.info.moduleA.values.length).toBe(0);
      expect(psWhich.info.moduleA.constants.length).toBe(0);
      expect(psWhich.info.moduleA.services.length).toBe(0);
      expect(psWhich.info.moduleA.directives.length).toBe(0);
      expect(psWhich.info.moduleA.providers.length).toBe(0);
    });

    it('lists factories of each Angular module', function() {
      angular.module('moduleB', []);
      angular.module('moduleC', []);

      function myFactory() { return {}; }

      angular.module('moduleB').factory('f1', myFactory);
      angular.module('moduleB').factory('f2', myFactory);

      angular.module('moduleC').factory('f3', myFactory);

      expect(psWhich.info.moduleB.factories).toEqual(['f1', 'f2']);
      expect(psWhich.info.moduleC.factories).toEqual(['f3']);
    });

    it('lists values of each Angular module', function() {
      angular.module('moduleD', []);
      angular.module('moduleE', []);

      angular.module('moduleD').value('v1', 1);
      angular.module('moduleD').value('v2', 2);

      angular.module('moduleE').value('v3', 3);

      expect(psWhich.info.moduleD.values).toEqual(['v1', 'v2']);
      expect(psWhich.info.moduleE.values).toEqual(['v3']);
    });

    it('lists constants of each Angular module', function() {
      angular.module('moduleF', []);
      angular.module('moduleG', []);

      angular.module('moduleF').constant('c1', 1);
      angular.module('moduleF').constant('c2', 2);

      angular.module('moduleG').constant('c3', 3);

      expect(psWhich.info.moduleF.constants).toEqual(['c1', 'c2']);
      expect(psWhich.info.moduleG.constants).toEqual(['c3']);
    });

    it('lists services of each Angular module', function() {
      angular.module('moduleH', []);
      angular.module('moduleI', []);

      function MyService() {}

      angular.module('moduleH').service('s1', MyService);
      angular.module('moduleH').service('s2', MyService);

      angular.module('moduleI').service('s3', MyService);

      expect(psWhich.info.moduleH.services).toEqual(['s1', 's2']);
      expect(psWhich.info.moduleI.services).toEqual(['s3']);
    });

    it('lists directives of each Angular module', function() {
      angular.module('moduleJ', []);
      angular.module('moduleK', []);

      function myDirective() { return {}; }

      angular.module('moduleJ').directive('d1', myDirective);
      angular.module('moduleJ').directive('d2', myDirective);

      angular.module('moduleK').directive('d3', myDirective);

      expect(psWhich.info.moduleJ.directives).toEqual(['d1', 'd2']);
      expect(psWhich.info.moduleK.directives).toEqual(['d3']);
    });

    it('lists providers of each Angular module', function() {
      angular.module('moduleL', []);
      angular.module('moduleM', []);

      function myProvider() {
        this.$get = function() { return 2; };
      }

      angular.module('moduleL').provider('p1', myProvider);
      angular.module('moduleL').provider('p2', myProvider);

      angular.module('moduleM').provider('p3', myProvider);

      expect(psWhich.info.moduleL.providers).toEqual(['p1', 'p2']);
      expect(psWhich.info.moduleM.providers).toEqual(['p3']);
    });
  });
});