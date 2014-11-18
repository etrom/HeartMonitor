'use strict';

angular.module('barsApp')
  .controller('PartnerCtrl', function ($scope, Auth, $http) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.partnerEmail = '';
    $scope.invite = false;
    $scope.hasPartner = false;

    $scope.currentUser.$promise.then(function(user) {
      if (user.partner) {
        $http.get('/api/users/whole/' + user.partner).success(function(partner){
          console.log(partner)
            $scope.partner = partner;
            $scope.hasPartner = true;
        })
      }
    })


    $scope.requestPartner = function(){
        console.log($scope.partnerEmail);
        $http.post('/api/users/findExisting/'+ $scope.currentUser._id, {email: $scope.partnerEmail}).
        success(function(data, status, headers, config) {

          //if they exist in the database send the request
          console.log(data, 'data')
          if(data[0]) {
            $scope.message = "request sent";
          } else {
            //if they do not tell them the user does not exist
            $scope.message = 'user does not exist';
            var email = $scope.partnerEmail;
            $scope.inviteButton(email);

          }
          $scope.partnerEmail = '';
          // socket.syncUpdates('message', $scope.message);

        }).
        error(function(data, status, headers, config) {

          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

        $scope.checkHasPartner = function() {



        }



  });
