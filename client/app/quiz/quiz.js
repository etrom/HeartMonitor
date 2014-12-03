'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quiz', {
        url: '/quiz',
        templateUrl: 'app/quiz/quiz.html',
        controller: 'QuizCtrl'
      })
      .state('quizResponse', {
        url: '/quizResponse/:id',
        templateUrl: 'app/quiz/quiz.html',
        controller: 'QuizCtrl',
        authenticate: true
      })
  });
