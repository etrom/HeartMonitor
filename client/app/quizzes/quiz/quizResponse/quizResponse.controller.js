'use strict';

angular.module('barsApp')
  .controller('QuizresponseCtrl', function ($scope, Auth, $http, $stateParams, $window) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    $scope.quizID = $stateParams.id;

    $scope.currentUser.$promise.then(function(user) {
      //get history to load questions
      $http.get('api/historys/' + $scope.quizID).success(function(data, status, headers, config) {
        data.historyObj.forEach(function(question){
            $scope.quiz.push([question[0], '']);

        })
      });
    })

    $scope.save = function() {
        var answers = [];
        $scope.quiz.forEach(function(question) {
            answers.push(question[1]);
        })
        $http.put('api/historys/'+ $scope.quizID, {responseObj:answers, responseDate: Date.now()}).
          success(function(data){
            $http.put('api/users/' + $scope.currentUser._id + '/actiontaken/'+$scope.quizID)
          }).
            success(function(data){
              $window.location.href= '/messages'
            })
    };
//put to history to save answers
  });
