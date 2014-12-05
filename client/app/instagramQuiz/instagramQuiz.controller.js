'use strict';

angular.module('barsApp')
  .controller('InstagramquizCtrl', function ($scope) {

    $scope.instagramName;
    hello.init({ 
      instagram: 'b97e7a4601ba4829866835ea9ae18613'
    },{redirect_uri:'redirect.html'});

    hello.on('auth.login', function(auth){
      // call user information, for the given network
      hello( auth.network ).api( '/me' ).then( function(r){
        // Inject it into the container
        $scope.instagramProfilePic = r.thumbnail 
        $scope.instagramName = r.name;
        $scope.$digest();
        
      });
    });
    $scope.currentPage = 0;
    $scope.pageSize = 2;
    $scope.instagramPhotos = [];
    $scope.noPictures = true;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.instagramPhotos.length/$scope.pageSize);                
    }

    $scope.loadPictures = function(){
      hello('instagram').api('/me/photos').then(function(json){
          
        $scope.photoTotal = json.data.length;
        if ($scope.photoTotal > 0) {
          $scope.noPictures = false;
        }
        // $scope.numberOfPages = $scope.photoTotal / $scope.pageSize;
        for (var i=0; i < $scope.photoTotal; i++) {
          $scope.instagramPhotos.push([json.data[i].thumbnail, json.data[i].picture, false]);
        }
        $scope.$digest();
      }, function(e) {
        alert ('Whoops! ' + e.error.message)
      })
    };
  });
