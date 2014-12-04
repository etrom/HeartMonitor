angular.module('barsApp')
        .factory('quizFactory', function(Auth, $http, $stateParams, $window) {
            return {
                barPercentRequest: function(num) {
                        var updateIncrease = num;
                        var user = Auth.getCurrentUser();
                        var partner = user.partner;
                        var currentBar = $stateParams.barName;
                            console.log(partner.bars.length, 'partner');
                            for (var i = 0; i < partner.bars.length; i++) {
                                console.log(partner.bars[i].name, 'name', currentBar, 'currentBar')
                                if(partner.bars[i].name === currentBar ) {
                                    console.log(currentBar, 'barName');
                                    $http.post('/api/users/requests/', {userId: partner._id, barName: partner.bars[i].name, increment: updateIncrease}).success(function(user){
                                        console.log(user, "new request")
                                        $window.location.href = '/home';
                                    });
                                }
                            }


                    }


                }
        });
