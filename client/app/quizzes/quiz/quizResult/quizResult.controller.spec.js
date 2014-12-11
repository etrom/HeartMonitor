'use strict';

describe('Controller: QuizresultCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var QuizresultCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizresultCtrl = $controller('QuizresultCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
