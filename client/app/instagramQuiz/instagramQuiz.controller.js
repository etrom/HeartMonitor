'use strict';

angular.module('barsApp')
  .controller('InstagramquizCtrl', function ($scope, $modal, $http, quizFactory, $window) {

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

    $scope.percentReq = quizFactory.barPercentRequest;

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
                            template: "app/instagramQuiz/instagramModal.html",
                            title: '<i class="fa fa-instagram fa-3x"></i> Create A Quiz!',
                            content: 'temps content value for content variable', show: true});

      }, function(e) {
        alert ('Whoops! ' + e.error.message)
      })
    };
    $scope.selectedPhotos = [];
    $scope.quizTitle = '';

    $scope.saveSelected = function(quizTitle) {
      $scope.sortPics = true;
      $scope.selectedPhotos = [];
      $scope.quizTitle = quizTitle;
      for (var i=0; i < $scope.photoTotal; i++) {
        if ($scope.instagramPhotos[i].selected) {
          $scope.selectedPhotos.push($scope.instagramPhotos[i]);
        }
      }
    };

    $scope.sortableOptions = {
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      }
    };


    $scope.save = function() {
      $http.post('api/historys/', {user: $scope.currentUser._id, type: 'IQ', points: 30, historyObj: $scope.selectedPhotos, iqTitle: $scope.quizTitle }).
        success(function(data, status, headers, config) {
          console.log('data')
          $scope.percentReq(30, data._id, 'inQuiz', 1)
          $scope.uniqueUrl = '/instagramResponse/'+ data._id;
          //stop sending emails for the time being
          // $http.post('api/emails/sendQuizRequest/', {
          //                                             email: $scope.currentUser.partner.email,
          //                                             reqFrom: $scope.currentUser._id,
          //                                             reqFromName:$scope.currentUser.name,
          //                                             url: $scope.uniqueUrl,
          //                                             profilePic: $scope.currentUser.profilePic
          //                                            }).success(function(data, status, headers, config) {
          //   $scope.message = "QUIZ has been saved and email has been sent!"
          // })
          $window.location.href = '/home';

        });

    }

  });
