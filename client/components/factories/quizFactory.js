angular.module('barsApp')
        .factory('quizFactory', function(Auth, $http, $stateParams, $window) {
            return {
                barPercentRequest: function(num, historyId) {
                    var updateIncrease = num;
                    var user = Auth.getCurrentUser();
                    var partner = user.partner;
                    var history = historyId;
                    console.log(history, 'history')
                        $http.post('/api/users/requests/', {userId: partner._id, actionType: 'nwQuiz', increment: updateIncrease, historyId: history}).success(function(user){
                            console.log(user, "new request")
                        });
                }

            }


        });


