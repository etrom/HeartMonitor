'use strict';

angular.module('barsApp')
  .controller('QuizCtrl', function ($scope, Auth, $http, quizFactory) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    // $scope.message = "When you complete the quiz below, we will send the quiz WITHOUT your answers to {{currentUser.partner.name}}.  Once {{currentUser.partner.name}} guesses your responses, we will share your combined answers with both of you!";
    // $scope.partnersQuizID = $stateParams;
    // // consol.log($stateParams);
    // console.log($scope.partnersQuizID, 'ID');
    $scope.currentUser.$promise.then(function(user) {

      $http.get('/api/quizs/num/' + user.quizNumber).success(function(data, status, headers, config) {
        data.questions.forEach(function(question) {
          $scope.quiz.push([question, '']);
        });
      }).error(function(data, status, headers, config) {
      });
      if (user.profilePic) {
        $scope.profilePicUrl = user.profilePic;
      }
      else {
        $scope.profilePicUrl = "http://bandarito.ph/assets/uploads/profile_image/default.jpg";
      }
    })

    $scope.save = function(){

      $http.post('api/historys/', {user: $scope.currentUser._id, type: 'NW', historyObj: $scope.quiz }).
        success(function(data, status, headers, config) {
          console.log(data);
          $scope.uniqueUrl = '/quizResponse/NW/'+ data.key;
          $http.post('api/emails/sendQuizRequest/', {email: $scope.currentUser.partner.email, reqFrom: $scope.currentUser._id,
                                    reqFromName:$scope.currentUser.name, url: $scope.uniqueUrl,
                                    profilePic: $scope.currentUser.profilePic }).
            success(function(data, status, headers, config) {
              $scope.message = "QUIZ has been saved and email has been sent!"
             }).
            error(function(data, status, headers, config) {
            });
         }).
        error(function(data, status, headers, config) {
        });
      };
  });


