'use strict';

angular.module('barsApp')
  .controller('QuizresultCtrl', function ($scope, Auth, $http, $stateParams, $window) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    $scope.quizResponse = [];
    $scope.quizID = $stateParams.id;
    $scope.quizMaker = '';
    $scope.responder = '';

    $scope.currentUser.$promise.then(function(user) {
      console.log($scope.currentUser);
      //get history to load questions
      $http.get('api/historys/' + $scope.quizID).success(function(data, status, headers, config) {
        $scope.quiz = data;
        console.log(data.user[0]);
        if ($scope.currentUser._id == data.user[0]) {
          console.log(data.user[0]);
          $scope.quizMaker = $scope.currentUser.name;
          $scope.responder = $scope.currentUser.partner.name;
        } else {
          $scope.quizMaker = $scope.currentUser.partner.name;
          $scope.responder = $scope.currentUser.name;
        }
        console.log(data);
        // $scope.quiz = data.historyObj;
        // $scope.quizResponse = data.responseObj;
      });
    })
  });
