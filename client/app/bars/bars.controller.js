'use strict';

angular.module('barsApp')
  .controller('BarCtrl', function ($scope, Auth) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.bars = $scope.currentUser.bars;
  });
