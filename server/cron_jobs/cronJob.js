var CronJob = require('cron').CronJob;
var User = require('../api/user/user.model');
var async = require('async');
var nodemailer = require('nodemailer');
var trans = require('../api/email/passwords');
var path = require('path'),
    templatesDir = path.join(__dirname, '../api/email/templates'),
    emailTemplates = require('email-templates');




///depeletes by .60 every hour === 100% depeletion in 7 days
module.exports = function() {
 //every second for testing
// var weeklyStatusEmail = new CronJob('* * * * * *', function() {
    //runs at 11:45 every wed
  var weeklyStatusEmail = new CronJob('00 45 11 * * 3', function(){
    // User.find().populate('partner').exec(function (err, user) {
    //   async.each(user, function(user, doneOneUser) {
    //         if(user.partner) {
    //           // var uniqueUrl = '/reminder/' + user.partner._id
    //           emailTemplates(templatesDir, function(err, template) {
    //             if (err) {
    //               console.log(err, 'error');
    //             } else {
    //               // An example users object with formatted email function
    //               var locals = {
    //                 points: user.points,
    //                 // link: 'http://localhost:9000' + uniqueUrl ,
    //                 name: {
    //                   first: user.partner.name,
    //                   last: 'Mia'
    //                 }
    //               };
    //                 // Send a single email
    //               template('weeklyUpdate', locals, function(err, html, text) {
    //                 if (err) {
    //                   console.log(err);
    //                 } else {
    //                   trans.sendMail({
    //                     from: 'HeartBars <heartbarsmailer@gmail.com>',
    //                     to: user.partner.email,
    //                     subject: user.partner.name +", here is your weekly HeartBars Breakdown ♥",
    //                     html: html,
    //                     generateTextFromHTML: true,
    //                     text: text
    //                   }, function(err, responseStatus) {
    //                     if (err) {
    //                       console.log(err);
    //                     } else {
    //                       console.log(responseStatus.message);
    //                     }
    //                   });
    //                 }
    //               });

    //               var Render = function(locals) {
    //                 this.locals = locals;
    //                 this.send = function(err, html, text) {
    //                   if (err) {
    //                     console.log(err);
    //                   } else {
    //                     transportBatch.sendMail({
    //                       from: 'Spicy Meatball'+ req.body.email,
    //                       to: locals.email,
    //                       subject: 'Mangia gli spaghetti con polpette!',
    //                       html: html,
    //                       generateTextFromHTML: true,
    //                       text: text
    //                     },
    //                     function(err, responseStatus) {
    //                       if (err) {
    //                         console.log(err);
    //                       } else {
    //                         console.log(responseStatus.message);
    //                       }
    //                     });
    //                   }
    //                 };
    //                   this.batch = function(batch) {
    //                     batch(this.locals, templatesDir, this.send);
    //                   };
    //               };
    //             }
    //           });
    //         }

    //                       console.log('weekly update running');

    //     // }

    //   }, function(err) {
    //     }
    //   )

    // })
  })

weeklyStatusEmail.start();


}



