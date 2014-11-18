'use strict';

describe('Controller: PartnerCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var PartnerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartnerCtrl = $controller('PartnerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
