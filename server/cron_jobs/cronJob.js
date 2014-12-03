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
  // runs every second for testing purposes
  // var depleteBars = new CronJob('* * * * * *', function() {

    //runs every hour
  var depleteBars = new CronJob('0 0 * * * *', function(){
    User.find().populate('partner').exec(function (err, user) {
      async.each(user, function(user, doneOneUser) {
        // depInterval passed in will represent the number of days a bar will
        //    take to fully deplete.
        // The product of cron job interval and number of days will provide
        //    subtrahend, therefore changes to the frequency of the
        //    cron job will require changing one of the muliplicands.
        for(var i = 0, length = user.bars.length; i < length; i++) {

          var full = user.bars[i].fulfillment;
          full = full.toFixed(3);
          full -= 100 / (user.bars[i].depInterval*24);
            if(user.partner && full <= 45 && user.reminded === false) {
              user.reminded = true;
              user.dateReminded = Date.now();
              user.save();
              console.log('reminded', user.reminded)
              console.log('date', user.dateReminded)
              var uniqueUrl = '/login/lowBars/'+ user._id +'/' + user.bars[i].name
              emailTemplates(templatesDir, function(err, template) {
                if (err) {
                  console.log(err, 'error');
                } else {
                  // An example users object with formatted email function
                  var locals = {
                    link: 'http://localhost:9000' + uniqueUrl ,
                    name: {
                      first: user.partner.name
                    }
                  };
                    // Send a single email
                  template('reminder', locals, function(err, html, text) {
                    if (err) {
                      console.log(err);
                    } else {
                      trans.sendMail({
                        from: 'HeartBars <heartbarsmailer@gmail.com>',
                        to: user.partner.email,
                        subject: user.name +"s Bars are getting low ♥",
                        html: html,
                        generateTextFromHTML: true,
                        text: text
                      }, function(err, responseStatus) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log(responseStatus.message);
                        }
                      });
                    }
                  });

                  var Render = function(locals) {
                    this.locals = locals;
                    this.send = function(err, html, text) {
                      if (err) {
                        console.log(err);
                      } else {
                        transportBatch.sendMail({
                          from: 'Spicy Meatball'+ req.body.email,
                          to: locals.email,
                          subject: 'Mangia gli spaghetti con polpette!',
                          html: html,
                          generateTextFromHTML: true,
                          text: text
                        },
                        function(err, responseStatus) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log(responseStatus.message);
                          }
                        });
                      }
                    };
                      this.batch = function(batch) {
                        batch(this.locals, templatesDir, this.send);
                      };
                  };
                }
              });
            }
            if (full <= 0) {
              full = 0;
            }

            user.bars[i].fulfillment = full;
            console.log(user.bars[i].fulfillment, 'cron running');
              // if (full <= 45){
              //   user.bars[i].remindedDate = new Date()
              // }
            if (i === length-1) {
              user.save(function(err, user, numModified) {
              });
            }
        }

      }, function(err) {
        }
      )

    })
  })

depleteBars.start();



// var weeklyStatusEmail = new CronJob('* * * * * *', function() {
    //runs at 11:45 every wed
  var weeklyStatusEmail = new CronJob('00 45 11 * * 3', function(){
    User.find().populate('partner').exec(function (err, user) {
      async.each(user, function(user, doneOneUser) {
            if(user.partner) {
              // var uniqueUrl = '/reminder/' + user.partner._id
              emailTemplates(templatesDir, function(err, template) {
                if (err) {
                  console.log(err, 'error');
                } else {
                  // An example users object with formatted email function
                  var locals = {
                    bars: user.bars,
                    // link: 'http://localhost:9000' + uniqueUrl ,
                    name: {
                      first: user.partner.name,
                      last: 'Mia'
                    }
                  };
                    // Send a single email
                  template('weeklyUpdate', locals, function(err, html, text) {
                    if (err) {
                      console.log(err);
                    } else {
                      trans.sendMail({
                        from: 'HeartBars <heartbarsmailer@gmail.com>',
                        to: user.partner.email,
                        subject: user.partner.name +", here is your weekly HeartBars Breakdown ♥",
                        html: html,
                        generateTextFromHTML: true,
                        text: text
                      }, function(err, responseStatus) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log(responseStatus.message);
                        }
                      });
                    }
                  });

                  var Render = function(locals) {
                    this.locals = locals;
                    this.send = function(err, html, text) {
                      if (err) {
                        console.log(err);
                      } else {
                        transportBatch.sendMail({
                          from: 'Spicy Meatball'+ req.body.email,
                          to: locals.email,
                          subject: 'Mangia gli spaghetti con polpette!',
                          html: html,
                          generateTextFromHTML: true,
                          text: text
                        },
                        function(err, responseStatus) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log(responseStatus.message);
                          }
                        });
                      }
                    };
                      this.batch = function(batch) {
                        batch(this.locals, templatesDir, this.send);
                      };
                  };
                }
              });
            }

                          console.log('weekly update running');

        // }

      }, function(err) {
        }
      )

    })
  })

weeklyStatusEmail.start();


}



