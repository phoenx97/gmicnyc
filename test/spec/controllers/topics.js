'use strict';

describe('Controller: TopicsCtrl', function () {

  // load the controller's module
  beforeEach(module('gmicnycApp'));

  var TopicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopicsCtrl = $controller('TopicsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
