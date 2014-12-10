'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quizResult', {
        url: '/quizResult/:id',
        templateUrl: 'app/quizzes/quiz/quizResult/quizResult.html',
        controller: 'QuizresultCtrl'
      });
  });