'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('partnerInvite', {
        url: '/signup/:signUpId/:invitedEmail',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'app/account/messages/messages.html',
        controller: 'MessagesCtrl',
        authenticate: true
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('surveyLogin', {
        url: '/login/lowBars/:userId/:barName',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('barUpdate', {
        url: '/messages/barsSurveyUpdate/:userId/:barName',
        views: {
          "" : {
                templateUrl: 'app/surveys/surveys.html',
                controller: 'SurveysCtrl',
                authenticate : true
              },

          'nwQuiz@barUpdate' : {
                controller: 'QuizCtrl',
                templateUrl: 'app/quiz/quiz.html',
                authenticate: true
              }
        }
        // templateUrl: 'app/surveys/surveys.html',
        // controller: 'SurveysCtrl',
        // authenticate: true
      })
      .state('quiz', {
        url: '/quiz',
        templateUrl: 'app/quiz/quiz.html',
        controller: 'QuizCtrl'
      })
      // .state('quizResponse', {
      //   url: '/quizResponse/:id',
      //   ,
      //   controller: 'QuizCtrl',
      //   authenticate: true
      // })


  });