'use strict';
// this page contains the view with the submit
// button for all surveys/points/quizzes
angular.module('barsApp')
  .controller('SurveysCtrl', function ($scope, $stateParams, Auth, $http, $window) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.params = $stateParams.id;
    // $scope.barPercentRequest = quizFactory.barPercentRequest();
    // $scope.barPercentRequest = function(num){
    //     $scope.updateIncrease = num;
    //     var partner = $scope.currentUser.partner;
    //         console.log(partner.bars.length, 'partner');
    //         for (var i = 0; i < partner.bars.length; i++) {
    //             if(partner.bars[i].name === $scope.currentBar ) {
    //                 console.log($scope.currentBar, 'barName');
    //                 $http.post('/api/users/requests/', {userId: partner._id, barName: partner.bars[i].name, increment: $scope.updateIncrease}).success(function(user){
    //                     console.log(user, "new request")
    //                     $scope.message = true;
    //                     $window.location.href = '/home';
    //                 });
    //             }
    //         }


    // }

  });
