'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
     $stateProvider
      .state('home', {
        url: '/home',
        views: {
            "": {templateUrl: 'app/home/home.html',
                 controller: 'HomeCtrl',
            },
            'bars@home' : {
                controller: 'BarCtrl',
                templateUrl: 'app/bars/bars.html'
            },

            'partner@home' : {
                controller: 'PartnerCtrl',
                templateUrl: 'app/partner/partner.html'
            }

        }
      })
  });