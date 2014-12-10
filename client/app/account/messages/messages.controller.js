'use strict';

angular.module('barsApp')
  .controller('MessagesCtrl', function ($scope, Auth, $http, $window) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.requests = [];
    $scope.actionRequests = $scope.currentUser.actionRequests
    $scope.ngHide = true;


    $scope.currentUser.$promise.then(function(user) {
        //get the request froms name
        if ($scope.currentUser.reqFrom) {
            $http.get('/api/users/'+ $scope.currentUser.reqFrom).success(function(reqFrom) {
                    $scope.reqFrom = reqFrom.name;

            });
        }

        console.log($scope.actionRequests);
        if($scope.actionRequests.length > 0){
            $scope.actionRequests.forEach(function(request) {
                console.log('request', request);
                $scope.requests.push(request);
                // if(request.actionType == "nwQuiz"){
                //     console.log('nwQuiz');
                // }
                // if(request.actionType == "instagram"){
                //     console.log('instagram');
                // }
                // if(request.actionType == "heSaidSheSaid"){
                //     console.log('heSaidSheSaid');
                // }
            });
            // console.log('herro request');
          // })
        }
});
    $scope.goToQuiz = function(){
        $window.location.href= '/response' + historyId;
    }
    $scope.goToinQuiz = function(historyId){
        $window.location.href= '/instagramResponse/' + historyId;
    }
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
