'use strict';

angular.module('barsApp')
  .controller('MessagesCtrl', function ($scope, Auth, $http, $window) {
    $scope.currentUser = Auth.getCurrentUser();

    $http.get('/api/users/'+ $scope.currentUser.reqFrom).success(function(reqFrom) {
            $scope.reqFrom = reqFrom.name;
    });

    // click accept or deny to add partner
    $scope.partnerDecision = function(decision) {
        $scope.decision = decision;
        $http.post('/api/users/'+ $scope.currentUser._id + '/confirmPartner/' + $scope.currentUser.reqFrom, {acceptance: decision}).
        success(function(data) {
            $http.get('/api/users/' + data._id).success(function(user){
                $scope.currentUser = user;
                console.log(user, 'messages controller user')
                $window.location.href= '/home';
            })
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })
    }

  });
