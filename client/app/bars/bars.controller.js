'use strict';

angular.module('barsApp')


  // config for the dropdown button.
  .config(function($dropdownProvider) {
    angular.extend($dropdownProvider.defaults, {
      html: true,
      aninmation: 'am-flip-x',
      trigger: 'click',
      delay: { show: 100, hide: 100 }
    });
  })

  .controller('BarCtrl', function ($scope, Auth, $http, $log, $window, $timeout) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.clicked = false;
    $scope.achievements = 0;
    $scope.goals = 0;
    $scope.currentGoal = false;
    var userHasHistory = false;
    var chartDays = [];
    var chartPoints = [];
    var weekday = new Array(7);
      weekday[0]=  "Sun";
      weekday[1] = "Mon";
      weekday[2] = "Tue";
      weekday[3] = "Wed";
      weekday[4] = "Thu";
      weekday[5] = "Fri";
      weekday[6] = "Sat";
    $scope.numAchieved = 0;
    $scope.goalSet=false;


    $scope.nowClicked = function(){
      $scope.clicked = true;
    }

    $scope.currentUser.$promise.then(function(user) {
      $scope.points = $scope.currentUser.points
      if (user.currentGoal){
        $scope.reminderSet = true;
        // $scope.clicked = true;
        $scope.currentGoal = user.currentGoal;
      }
      if (user.profilePic) {
        $scope.profilePicUrl = user.profilePic;
      }
      else {
        $scope.profilePicUrl = "http://bandarito.ph/assets/uploads/profile_image/default.jpg";
      }

      $http.get('/api/historys/user/' + $scope.currentUser._id).
        success(function(data) {
          if(data.length > 0) {
            userHasHistory = true;
          } else {
            $http.get('/api/historys/user/' + $scope.currentUser.partner._id)
              .success(function(data) {
                if(data.length >= 1) {
                  userHasHistory = true;
                } else {
                  userHasHistory = false;
                }

              })
          }
        });
      $http.get('/api/historys/points5days/' + $scope.currentUser._id + '/' + $scope.currentUser.partner._id).
        success(function(data) {
          console.log(data);
          var prevTotal = 0;
          Object.keys(data).forEach(function (key) {
            var d = new Date();
            d.setFullYear(key.substring(4, 0));
            d.setMonth(key.substring(4, 6));
            d.setDate(key.substring(6, 8));
            chartDays.push(weekday[d.getDay()]);
            var total = prevTotal + parseInt(data[key]);
            chartPoints.push(total);
            prevTotal = total;
          });

        });
        $http.get('/api/historys/achievements/' + $scope.currentUser._id + '/' + $scope.currentUser.partner._id).
        success(function(achievements) {
          achievements.forEach(function (obj) {
            if(obj.user[0] === $scope.currentUser._id) {
              $scope.numAchieved +=1;
            } else if (obj.user[0] === $scope.currentUser.partner._id && obj.responseDate){
              $scope.numAchieved +=1;
            }
          })
        });
    })
    $scope.hasHistory = function() {
      if(userHasHistory) {
        $scope.history = true;
      }
    }

    $scope.hasPartner= function() {
      if ($scope.currentUser.partner) {
        $window.location.href = '/games';
      } else {
        console.log('else');
        $scope.timesOut = function() {
          console.log('time');
        $scope.noPartner = false;
      }
      $scope.noPartner = true;
      var newTime = $timeout($scope.timesOut,5000);
      }
    }
    // values for the points dropdown button
    $scope.dropdown = [
      {text: '<i class="fa fa-heart"></i><p>romance</p>&nbsp;10', click: 'addgoal(10, bar.name)'},
      {text: '<i class="fa fa-quote-left"></i><p>communication</p>&nbsp;20', click: 'addPercent(20, bar.name)'},
      {text: '<i class="fa fa-thumbs-o-up"></i><p>compliments</p>&nbsp;30', click: 'addPercent(30, bar.name)'},
      {text: '<i class="fa fa-plus"></i><p>affection</p>&nbsp;30', click: 'addPercent(30, bar.name)'}

    ];

    $scope.cancel = false;
    $scope.setGoal = function(string){
      $scope.currentGoal = string;
    }
     $scope.saveGoal = function(currentGoal){
      $http.put('/api/users/'+ $scope.currentUser._id, {currentGoal: currentGoal});
      $scope.points +=15;
      $scope.currentGoalReminder = true;
      $scope.currentGoalSet = true;
      $scope.onTimeout = function(){
        $scope.goalSet = false;
      }
      $scope.goalSet = true;
      var mytimeout = $timeout($scope.onTimeout,5000);

    }
    // increase fulfillment #'s
    $scope.addPercent = function(num, barName){
      $scope.barClicked = barName;
      $http.post('/api/users/bar/' + $scope.currentUser._id, { barName: $scope.barClicked, fulfillment: num});
      for(var i=0, len=$scope.bars.length; i<len; i++) {
        if($scope.bars[i].name == $scope.barClicked ) {
          $scope.bars[i].fulfillment += num;
          i = len;
        }
      }
    }

    $scope.editProfilePic = function(){
      filepicker.setKey("A5azH2GFfSfyjgyYXD1qRz");
      filepicker.pick({
                      mimetypes: ['image/*'],
                      container: 'window',
                      services:['COMPUTER', 'FACEBOOK', 'GMAIL'],
      },

        function(Blob){
          $scope.chosenPic = true
          $scope.profilePicUrl = Blob.url + '+.jpg'
          $http.post('/api/users/profilePic/' + $scope.currentUser._id, { profilePic: $scope.profilePicUrl});

        }
      );
    };

    var featherEditor = new Aviary.Feather({
       apiKey: 'ece8de92a9848cc1',
       apiVersion: 3,
       theme: 'light', // Check out our new 'light' and 'dark' themes!
       appendTo: '',
       onSave: function(imageID, newURL) {
           var img = document.getElementById(imageID);
           img.src = newURL;
       },
       onError: function(errorObj) {
           alert(errorObj.message);
       }
   });

   $scope.launchEditor = function(id, src) {
    featherEditor.launch({
      image: id,
      url: $scope.profilePicUrl,
      forceCropPreset: ['Square', '1:1'],
      forceCropMessage: 'Please crop your photo'
     });
      return false;
   }
   console.log(chartPoints);
   $scope.highchartsNG = {
        options: {
            chart: {
              type: 'line',
              width: 250,
              height: 250
            }
        },
        series: [{
            name: 'Points Last 5 Days',
            data: chartPoints // [10, 40, 70] // chartPoints
        }],
        title: {
            text: null
        },
        xAxis: {
          startOfWeek: 0,
          allowDecimals: false,
          categories: chartDays

        },
        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: null

          }
        },
        pane: {
          size: '20px'
        },
        loading: false,
        minRange: 0,
    }

   // achievement to display- 5 quizzes
  //if history.type === any quiztype
   // count = count + 1
   //for each count increase bar by 20%
   // display graph
  });
