'use strict';

angular.module('barsApp')
  .controller('BarCtrl', function ($scope, Auth, $http, $log) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.bars = $scope.currentUser.bars;
    $scope.test = 'keep your voice down';

      $scope.status = {
        isopen: false
      };

      $scope.$watch('status', function(oldval, newval) {
        console.log(oldval);
        console.log(newval);
      });

      $scope.toggled = function(open) {
        $log.log($scope.status);
        $scope.status.isopen = !$scope.status.isopen;
        $log.log($scope.status);
      };

      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        // console.llog
        $scope.status.isopen = !$scope.status.isopen;
        // console.log($scope.status)
      };


      // increase fulfillment #'s
        $scope.addPercent = function(barName, num){
          console.log($scope.currentUser._id, 'user');
          console.log(barName, 'name');
          console.log(num, 'num')
          $http.post('/api/users/bar/' + $scope.currentUser._id, { barName: barName, fulfillment: num});
          console.log('added');

        }

  });
