'use strict';
var _ = require('lodash');
var Email = require('./email.model');
var nodemailer = require('nodemailer');
var trans = require('./passwords');
var path = require('path'),
    templatesDir = path.join(__dirname, 'templates'),
    emailTemplates = require('email-templates');
var User = require('../user/user.model');



exports.sendRequest = function(req, res) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err, 'error');
    } else {
    // An example users object with formatted email function
      var locals = {
        email: 'elaine.trombley3@gmail.com',
        link: 'http://localhost:9000' + req.body.url + '/' + req.body.email,
        name: {
          first: req.body.reqFromName,
          last: 'Mia',

        }
      };

    // Send a single email
    template('welcome', locals, function(err, html, text) {
      if (err) {
        console.log(err);
      } else {
        trans.sendMail({
          from: 'HeartBars <heartbarsmailer@gmail.com>',
          to: req.body.email,
          subject: req.body.reqFromName +' has invited you to join HeartBars ♥',
          html: html,
          generateTextFromHTML: true,
          text: text
        }, function(err, responseStatus) {
          if (err) {
            console.log(err);
          } else {
            res.json(200, 'Message sent');
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
                }, function(err, responseStatus) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json(200, 'Message sent');
                  }
                });
              }
            };
            this.batch = function(batch) {
              batch(this.locals, templatesDir, this.send);
            };
          };

          // Load the template and send the emails
          // template('welcome', true, function(err, batch) {
          //   for(var user in users) {
          //     var render = new Render(users[user]);
          //     render.batch(batch);
          //   }
          // });
        }
      });

}
      // var mailOptions = {
      //       from: user.name +' has invited you to join Heart Bars ♥ <heartbarsmailer@gmail.com>', // sender address
      //       to: req.body.email, // list of receivers
      //       subject: '♥♥♥♥♥', // Subject line
      //       text: '♥♥♥♥♥', // plaintext body
      //       html: '<b><a href="http://localhost:9000' + req.body.url + '">signup now</a></b>' // html body
      //   };
        // send mail with defined transport object
        // trans.sendMail(mailOptions, function(error, info){
        //     if(error){
        //         console.log(error);
        //     } else{
        //         console.log('Message sent: ' + info.response);
        //         res.json(200, 'Message sent');
        //     }
        // });
        // if(err) { return handleError(res, err); }





// Get list of emails
exports.index = function(req, res) {
  Email.find(function (err, emails) {
    if(err) { return handleError(res, err); }
    return res.json(200, emails);
  });
};

// Get a single email
exports.show = function(req, res) {
  Email.findById(req.params.id, function (err, email) {
    if(err) { return handleError(res, err); }
    if(!email) { return res.send(404); }
    return res.json(email);
  });
};

// Creates a new email in the DB.
exports.create = function(req, res) {
  Email.create(req.body, function(err, email) {
    if(err) { return handleError(res, err); }
    return res.json(201, email);
  });
};

// Updates an existing email in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Email.findById(req.params.id, function (err, email) {
    if (err) { return handleError(res, err); }
    if(!email) { return res.send(404); }
    var updated = _.merge(email, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, email);
    });
  });
};

// Deletes a email from the DB.
exports.destroy = function(req, res) {
  Email.findById(req.params.id, function (err, email) {
    if(err) { return handleError(res, err); }
    if(!email) { return res.send(404); }
    email.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}