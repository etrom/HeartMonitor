'use strict';

angular.module('barsApp')
  .controller('PartnerCtrl', function ($scope, Auth, $http, $modal) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.partnerEmail = '';
    $scope.invite = false;
    $scope.hasPartner = false;
    $scope.clicked= false;

    $scope.addFB = function() {
      $scope.clicked = true;
    }
    

    $scope.currentUser.$promise.then(function(user) {
      console.log(user, 'userinpartner');
      if (user.partner) {
        // $http.get('/api/users/whole/' + user.partner).success(function(partner){
            $scope.partner = user.partner;
            $scope.hasPartner = true;
        // })
      } else {
        if ($scope.currentUser.facebook.significant_other) {
          $scope.fbPartnerPic = 'https://graph.facebook.com/' + $scope.currentUser.facebook.significant_other.id + '/picture?width=200';
          var myModal = $modal({scope: $scope, template: "/app/partner/fbModal.html", title: '<i class="fa fa-facebook-square"></i> You have a significant other on Facebook', content: 'Would like to add ' + $scope.currentUser.facebook.significant_other.name + ' as your Heart Bar Partner?', show: true});
        }
      }
    })


    $scope.requestPartner = function(){
        $http.post('/api/users/findExisting/'+ $scope.currentUser._id, {email: $scope.partnerEmail}).
        success(function(data, status, headers, config) {

          //if they exist in the database send the request
          if(data[0]) {
            $scope.message = "request sent";
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
           }).
          error(function(data, status, headers, config) {
          });
          $scope.partnerEmail = '';
      };
  });
