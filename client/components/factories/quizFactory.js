angular.module('barsApp')
        .factory('quizFactory', function(Auth, $http, $stateParams, $window) {
            return {
                barPercentRequest: function(num, historyId, actionType, quizNum) {
                    var updateIncrease = num;
                    var user = Auth.getCurrentUser();
                    var partner = user.partner;
                    var history = historyId;
                    var actionType = actionType;
                    var quizNum = quizNum;

                    $http.post('/api/users/requests/', { userId: partner._id, actionType: actionType, points: updateIncrease, historyId: history, quizNum: quizNum}).success(function(user){
                        console.log(user, "new request")
                    });
                }

            }


        });


