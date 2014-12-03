'use strict';

describe('Controller: SurveysCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var SurveysCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SurveysCtrl = $controller('SurveysCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
