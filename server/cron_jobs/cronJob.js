var CronJob = require('cron').CronJob;
var User = require('../api/user/user.model');
var async = require('async');


// Bar.find(function (err, bars) {
//   console.log(bars);
//   if (barinterval === 7 ) {
//     var oneWeek = new CronJob('* 0-23 * * * 0-6', function(){
//         // Runs every day (sun through sat)
//         // on hours 0 - 23
//         // subtracts .6 and hour -- bar will deplete completely  in 7 days
//         // Bar.find({ _id:req.params.id},{fulfillment: req.body.fulfillment - .60 }, function(err,user) {
//       })
//       }, function () {
//         // This function is executed when the job stops
//       },
//       true /* Start the job right now */,
//       timeZone /* Time zone of this job. */
//     );
//   }
// });

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



