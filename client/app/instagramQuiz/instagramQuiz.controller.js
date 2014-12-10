'use strict';

angular.module('barsApp')
  .controller('InstagramquizCtrl', function ($scope, $modal, $http) {

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
        $scope.instagramPhotos = [];         
        $scope.photoTotal = json.data.length;
        if ($scope.photoTotal > 0) {
          $scope.noPictures = false;
        }
        // $scope.numberOfPages = $scope.photoTotal / $scope.pageSize;
        for (var i=0; i < $scope.photoTotal; i++) {
          $scope.instagramPhotos.push({selected: false,
                                      created: Date(json.data[i].created_time),
                                      label: json.data[i].name, 
                                      thumbnail: json.data[i].thumbnail, 
                                      picture: json.data[i].picture});
        }
        $scope.$digest();
        var myModal = $modal({scope: $scope, 
                            template: "/app/instagramQuiz/instagramModal.html", 
                            title: '<i class="fa fa-instagram fa-3x"></i> Create A Quiz!', 
                            content: 'temps content value for content variable', show: true});
      }, function(e) {
        alert ('Whoops! ' + e.error.message)
      })
    };
    $scope.selectedPhotos = [];

    $scope.saveSelected = function(quizTitle) {
      $scope.selectedPhotos = [];
      for (var i=0; i < $scope.photoTotal; i++) {
        if ($scope.instagramPhotos[i].selected) {
          $scope.selectedPhotos.push($scope.instagramPhotos[i]);
        }
      }
      var myFinalModal = $modal({scope: $scope,
                          template: "/app/instagramQuiz/finalizeInstagramModal.html",
                          title: '<i class="fa fa-instagram fa-3x"></i> ' + quizTitle,
                          content: 'temps content value for centent variable'})
    };

    $scope.sortableOptions = {   
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      }
    };
    
  });
