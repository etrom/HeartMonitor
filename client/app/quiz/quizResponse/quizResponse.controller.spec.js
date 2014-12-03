'use strict';

describe('Controller: QuizresponseCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var QuizresponseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizresponseCtrl = $controller('QuizresponseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
