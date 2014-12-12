'use strict';

angular.module('barsApp')
  .controller('InstagramresponseCtrl', function ($scope, Auth, $stateParams, $http, $window, quizFactory) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    $scope.quizID = $stateParams.id;
    $scope.iqTitle ='';
    $scope.percentReq = quizFactory.barPercentRequest;


    $scope.currentUser.$promise.then(function(user) {
      $http.get('api/historys/' + $scope.quizID).success(function(data, status, headers, config) {
        var currentIndex = data.historyObj.length, temporaryValue, randomIndex ;
        // randomize the order of the pictures for partner to guess
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = data.historyObj[currentIndex];
          data.historyObj[currentIndex] = data.historyObj[randomIndex];
          data.historyObj[randomIndex] = temporaryValue;
        }
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
        $http.put('api/historys/'+ $scope.quizID, {responseObj:$scope.quiz, points: 10, responseDate: Date.now()}).
          success(function(data){
            $http.put('api/users/' + $scope.currentUser._id + '/actiontaken/'+$scope.quizID)
          }).
            success(function(data){
              $scope.percentReq(0, data._id, 'iqResults');
              $window.location.href= '/instagramResults/' + $scope.quizID;
            })
    }
  });
