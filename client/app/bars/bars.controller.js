'use strict';

angular.module('barsApp')
  
  // config for the dropdown button.
  .config(function($dropdownProvider) {
    angular.extend($dropdownProvider.defaults, {
      html: true
    });
  })

  .controller('BarCtrl', function ($scope, Auth, $http, $log) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.bars = $scope.currentUser.bars;
    $scope.test = 'keep your voice down';
    $scope.plusButtonPressed = '';

    // values for the points dropdown button
    $scope.dropdown = [
      {text: '<i class="fa fa-plus"></i>&nbsp;10', click: 'addPercent(10)'},
      {text: '<i class="fa fa-plus"></i>&nbsp;20', click: 'addPercent(20)'},
      {text: '<i class="fa fa-plus"></i>&nbsp;30', click: 'addPercent(30)'} 
    ];

    // determine and record which bar's plus dropdown has been accessed
    $scope.plusButtonClicked = function(barName) {
      console.log('ding', barName);
      $scope.plusButtonPressed = barName;
    }

    // increase fulfillment #'s
    $scope.addPercent = function(num){
      console.log($scope.currentUser._id, 'user');
      console.log($scope.plusButtonPressed, 'name');
      console.log(num, 'num')
      $http.post('/api/users/bar/' + $scope.currentUser._id, { barName: $scope.plusButtonPressed, fulfillment: num});
      console.log('added');
    }
  });
