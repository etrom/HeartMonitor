'use strict';

angular.module('barsApp')
  .controller('QuizCtrl', function ($scope, Auth, $http) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    // $scope.message = "When you complete the quiz below, we will send the quiz WITHOUT your answers to {{currentUser.partner.name}}.  Once {{currentUser.partner.name}} guesses your responses, we will share your combined answers with both of you!";
    // $scope.partnersQuizID = $stateParams;
    // // consol.log($stateParams);
    // console.log($scope.partnersQuizID, 'ID');

    $scope.currentUser.$promise.then(function(user) {
      $http.get('/api/quizs/num/'+ $scope.currentUser.quizNumber).
      success(function(data, status, headers, config) {
        data.questions.forEach(function(question) {
          $scope.quiz.push([question, '']);
        });
      }).
      error(function(data, status, headers, config) {
      });
      if (user.profilePic) {
        $scope.profilePicUrl = user.profilePic;
      }
      else {
        $scope.profilePicUrl = "http://bandarito.ph/assets/uploads/profile_image/default.jpg";
      }
    })

    $scope.save = function(){
      $scope.uniqueUrl = '/quizResponse/'+ $scope.currentUser._id;
      $http.post('api/historys/', {user: $scope.currentUser._id, type: 'NW', historyObj: $scope.quiz }).
        success(function(data, status, headers, config) {
          console.log(data);
          $http.post('api/emails/sendQuizRequest/', {email: $scope.currentUser.partner.email, reqFrom: $scope.currentUser._id,
                                    reqFromName:$scope.currentUser.name, url: $scope.uniqueUrl, 
                                    profilePic: $scope.currentUser.profilePic }).
            success(function(data, status, headers, config) {
              $scope.message = "request sent";
              $scope.invite = false;
              $scope.submitted = true;
             }).
            error(function(data, status, headers, config) {
            });
         }).
        error(function(data, status, headers, config) {
        });
        $scope.partnerEmail = '';
      };


  });


