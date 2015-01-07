'use strict';

angular.module('barsApp')
  .controller('PartnerCtrl', function ($scope, Auth, $http, $modal) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.partnerEmail = '';
    $scope.invite = false;
    $scope.hasPartner = false;
    $scope.show = true;
    $scope.clicked= function() {
      $scope.show = false;
    };


    $scope.addFB = function() {
      $scope.show = false;
    }


    $scope.currentUser.$promise.then(function(user) {
      if (user.partner) {
        // $http.get('/api/users/whole/' + user.partner).success(function(partner){
        $scope.partner = user.partner;
        $scope.hasPartner = true;
        $scope.points = $scope.currentUser.partner.points;

        //show only first name for facebook pull in
        if(user.partner.name.search(' ')){
          var nameArr = user.partner.name.split(' ');
          $scope.name = nameArr[0];
        }
        // })
      } else {
          $scope.fbPartnerPic = 'https://graph.facebook.com/' + $scope.currentUser.facebook.significant_other.id + '/picture?width=200';
          var myModal = $modal({scope: $scope, template: "app/partner/fbModal.html", title: '<i class="fa fa-facebook-square"></i> You have a significant other on Facebook', content: 'Would like to add ' + $scope.currentUser.facebook.significant_other.name + ' as your Heart Bar Partner?', show: true});
        }

      if ($scope.partner.profilePic) {
        $scope.picUrl = user.partner.profilePic;
      }
      else {
        $scope.picUrl = "http://bandarito.ph/assets/uploads/profile_image/default.jpg";
      }

    })




    $scope.requestPartner = function(){
        $scope.show = false;
        $http.post('/api/users/findExisting/'+ $scope.currentUser._id, {email: $scope.partnerEmail}).
        success(function(data, status, headers, config) {

          //if they exist in the database send the request
          if(data[0]) {
            $scope.message = "request sent, waiting for acceptance";
          } else {
            $scope.invite = true;
            //if they do not tell them the user does not exist
            $scope.message = 'user does not exist';
            var email = $scope.partnerEmail;
          }
        }).
        error(function(data, status, headers, config) {
        });
      }

      $scope.uniqueUrl = '/signup/'+ $scope.currentUser._id;

      $scope.sendInvite = function(fbEmail){
        if (fbEmail) {
          $scope.partnerEmail = fbEmail;
        }
        $http.post('api/emails/', {email: $scope.partnerEmail, reqFrom: $scope.currentUser._id,
                                      reqFromName:$scope.currentUser.name, url: $scope.uniqueUrl }).
          success(function(data, status, headers, config) {
            $scope.message = "request sent";
            $scope.invite = false;
            $scope.submitted = true;
            $scope.partnerEmail = '';
           }).
          error(function(data, status, headers, config) {
          });
          $scope.partnerEmail = '';
      };
  });
