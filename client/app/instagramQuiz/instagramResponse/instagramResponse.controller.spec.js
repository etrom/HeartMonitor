'use strict';

describe('Controller: InstagramresponseCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var InstagramresponseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstagramresponseCtrl = $controller('InstagramresponseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
