'use strict';

angular.module('barsApp')


  // config for the dropdown button.
  .config(function($dropdownProvider) {
    angular.extend($dropdownProvider.defaults, {
      html: true,
      aninmation: 'am-flip-x',
      trigger: 'click',
      delay: { show: 100, hide: 100 }
    });
  })

  .controller('BarCtrl', function ($scope, Auth, $http, $log) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.bars = $scope.currentUser.bars;
    $scope.test = 'keep your voice down';

    $scope.plusButtonPressed = '';

    // refresh the bars (900000 = 15 minutes)
    setInterval(function(){
      $http.get('/api/users/bar/' + $scope.currentUser._id)
        .success(function(data, status, headers, config) {
          $scope.bars = data;
      })
      for(var i=0, len=$scope.bars.length; i<len; i++) {
        $scope.bars[i].fulfillment += 0; 
      };
    },900000)

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
      for(var i=0, len=$scope.bars.length; i<len; i++) {
        if($scope.bars[i].name == $scope.plusButtonPressed ) {
          $scope.bars[i].fulfillment += num; 
          i = len;
        }
      }
    }


  });
