'use strict';

describe('Controller: InstagramquizCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var InstagramquizCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstagramquizCtrl = $controller('InstagramquizCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
