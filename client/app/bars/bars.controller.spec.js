'use strict';

describe('Controller: BarsCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var BarsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BarsCtrl = $controller('BarsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
