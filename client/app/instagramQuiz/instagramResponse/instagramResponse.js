'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('instagramResponse', {
        url: '/instagramResponse/:id',
        templateUrl: 'app/instagramQuiz/instagramResponse/instagramResponse.html',
        controller: 'InstagramresponseCtrl'
      });
  });