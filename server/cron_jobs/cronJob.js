var CronJob = require('cron').CronJob;
var User = require('../api/user/user.model');
var async = require('async');




///depeletes by .60 every hour === 100% depeletion in 7 days
module.exports = function() {
  var cron = new CronJob('0 0 * * * *', function(){
    User.find(function (err, user) {
      async.each(user, function(user, doneOneUser) {
        // var interval = user.bar.depInterval;

         // -= 0.005 * 60  14 days depletion
         // -= 0.01 * 60 7 days depletion
         // ]-= 1.25 * 60 depletes 1.25 every sec really fast/ test case
          for(var i = 0, length = user.bars.length; i < length; i++) {
              var full = user.bars[i].fulfillment;
              full = full.toFixed(3);
              full -= 0.01 * 60; //depleting .01 every second
              if (full <= 0){
                  full = 0;
              }

              user.bars[i].fulfillment = full;

              // if (full <= 45){
              //   user.bars[i].remindedDate = new Date()
              // }
              if (i === length-1) {
                user.save(function(err, user, numModified) {
                });
              }
          }

      }, function(err) {

      });

    })
  })

  cron.start();

}



