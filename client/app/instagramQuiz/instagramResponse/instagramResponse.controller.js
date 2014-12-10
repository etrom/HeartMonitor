'use strict';

angular.module('barsApp')
  .controller('InstagramresponseCtrl', function ($scope, Auth, $stateParams, $http) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.quiz = [];
    $scope.quizID = parseInt($stateParams.id);
    console.log($scope.quizID);
    $scope.iqTitle ='';


    $scope.currentUser.$promise.then(function(user) {
      //get history to load questions
      $http.get('api/historys/' + user.partner._id).success(function(data, status, headers, config) {
        console.log('data', data);
        data.forEach(function(obj) {
          if(obj.key == $scope.quizID) {
            $scope.iqTitle = obj.iqTitle;
            // obj.historyObj.forEach(function(photo){
              $scope.quiz = obj.historyObj;
            // });
          }
        });


        // data[0].historyObj.forEach(function(question){
        //   console.log($scope.quizID);
        //   if(question.key == $scope.quizID) {
        //     console.log('q', question)
        //     $scope.iqTitle = question.iqTitle;
        //     $scope.quiz.push([question, '']);
        //   }
        // })
        console.log('quiz scope;', $scope.quiz)
      });
    })

    $scope.sortableOptions = {   
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      }
    };

    $scope.save = function() {
        var answers = [];
        $scope.quiz.forEach(function(question) {
            answers.push(question[1]);
        })
        // $http.put('api/historys/'+ $scope.currentUser.partner._id, {responseObj:answers, responseDate: Date.now()}).success(function(data){
        //     console.log(data, 'new data')
        // })
    }
  });
