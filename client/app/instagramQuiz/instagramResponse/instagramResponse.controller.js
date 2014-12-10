'use strict';

angular.module('barsApp')
  .controller('InstagramresponseCtrl', function ($scope, Auth, $stateParams, $http) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    $scope.quizID = $stateParams.id;
    $scope.iqTitle ='';


    $scope.currentUser.$promise.then(function(user) {
      $http.get('api/historys/' + $scope.quizID).success(function(data, status, headers, config) {
        $scope.iqTitle = data.iqTitle;
        $scope.quiz = data.historyObj;
      });
    })

    $scope.sortableOptions = {   
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      }
    };

    $scope.save = function() {
        $http.put('api/historys/'+ $scope.quizID, {responseObj:$scope.quiz, responseDate: Date.now()}).success(function(data){
        })
    }
  });
