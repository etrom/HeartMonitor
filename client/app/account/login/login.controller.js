'use strict';

angular.module('barsApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $stateParams) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid && $stateParams.userId) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        }).then( function() {
          // Logged in, redirect bars page
          // /lowBars/:userId/:barName
          $location.path('/messages/barsSurveyUpdate/'+ $stateParams.userId +'/'+$stateParams.barName );
        })
      } else if(form.$valid){
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/home');
        })

        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;

    };
  });
