'use strict';

angular.module('barsApp')
  .controller('QuizresponseCtrl', function ($scope, Auth, quizFactory, $http) {
    $scope.message = 'Hello';
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];


    $scope.currentUser.$promise.then(function(user) {
      //get history to load questions
      $http.get('api/historys/' + user.partner._id).success(function(data, status, headers, config) {
        data[0].historyObj.forEach(function(question){
            $scope.quiz.push([question[0], '']);

        })
      });
    })

    $scope.save = function() {
        var answers = [];
        $scope.quiz.forEach(function(question) {
            answers.push(question[1]);
        })
        $http.put('api/historys/'+ $scope.currentUser.partner._id, {responseObj:answers, responseDate: Date.now()}).success(function(data){
            console.log(data, 'new data')
        })
    }
//put to history to save answers
  });
