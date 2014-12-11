'use strict';

describe('Controller: InstagramresultsCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var InstagramresultsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstagramresultsCtrl = $controller('InstagramresultsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
