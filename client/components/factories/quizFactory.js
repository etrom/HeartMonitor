angular.module('barsApp')
        .factory('quizFactory', function(Auth, $http, $stateParams, $window) {
            return {
                barPercentRequest: function(num, historyId, actionType, quizNum) {
                    var updateIncrease = num;
                    console.log(updateIncrease, 'updateIncrease')
                    var user = Auth.getCurrentUser();
                    var partner = user.partner;
                    var history = historyId;
                    var actionType = actionType;
                    var quizNum = quizNum;
                    console.log(history, 'history')
                        $http.post('/api/users/requests/', { userId: partner._id, actionType: actionType, increment: updateIncrease, historyId: history, quizNum: quizNum}).success(function(user){
                            console.log(user, "new request")
                        });
                }

            }


        });


