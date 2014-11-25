'use strict';

angular.module('barsApp')
  .controller('SignupCtrl', function ($scope, $stateParams, $http, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.user.email = $stateParams.invitedEmail; // invited partner's email

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          partner: $stateParams.signUpId,
          bars: [{name:'Social', depInterval: 1},
          // NOTE: depInterval value represents the number of days it takes for a bar to deplete.
           {name:'Romance', depInterval: 1},
            {name:'Entertainment', depInterval: 7},
           {name:'Intimacy', depInterval: 14},
            {name:'Alone Time', depInterval: 14}]
        }).
        then(function() {
          Auth.getCurrentUser().$promise.then(function(data) {
            $scope.user = data;
            console.log($scope.user, 'user')
            ////this sets partner instantly instead of checking for acceptance
            if ($stateParams.signUpId) {
              $http.post('/api/users/' + $scope.user._id + '/confirmPartner/' + $stateParams.signUpId, {acceptance: true});
            }
          })
        })
        .then(function() {
          Auth.getCurrentUser().$promise.then(function(data) {
            $scope.currentUser = data;
            })
          })
        .then( function() {
          // Account created, redirect to home
          $location.path('/home');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
