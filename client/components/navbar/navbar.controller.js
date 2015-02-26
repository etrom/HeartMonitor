'use strict';

angular.module('barsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/home'
    }];


    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.hasMessage = false;

if($scope.isLoggedIn()){
  $scope.currentUser.$promise.then(function(user) {
    if (user.actionRequests.length > 0 || user.requests == true && $scope.iWasClicked == false) {
      $scope.hasMessage = true;
    }
    if (user.partner === undefined && user.reqFrom) {
      $scope.hasMessage = true;
    }
  })
}

  $scope.clicked = function(){
    $scope.iWasClicked = true;
  }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
