angular.module('barsApp')
        .factory('quizFactory', function(Auth, $http, $stateParams, $window) {
            return {
                barPercentRequest: function(num) {
                    var updateIncrease = num;
                    var user = Auth.getCurrentUser();
                    var partner = user.partner;
                        $http.post('/api/users/requests/', {userId: partner._id, increment: updateIncrease}).success(function(user){
                            console.log(user, "new request")
                            // $window.location.href = '/home';
                        });
                }

            }


        });


