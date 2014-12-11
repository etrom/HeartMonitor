'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('instagramResults', {
        url: '/instagramResults/:id',
        templateUrl: 'app/instagramQuiz/instagramResults/instagramResults.html',
        controller: 'InstagramresultsCtrl'
      });
  });