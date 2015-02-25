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
          last: 'Mia'
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
    }
    User.findById(req.body.reqFrom, function (err, user) {
      if (err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
      user.partnerEmail = req.body.email;
      user.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, user);
      });
    });
  });
}


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

exports.sendQuizRequest = function(req, res) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err, 'error');
    } else {
      // An example users object with formatted email function
      var locals = {
        email: 'elaine.trombley3@gmail.com',
        link: 'http://localhost:9000' + req.body.url,
        profilePic: req.body.profilePic,
        name: {
          first: req.body.reqFromName,
          last: 'Mia'
        }
      };
      // Send a single email
      template('quizRequest', locals, function(err, html, text) {
        if (err) {
          console.log(err);
        } else {
          trans.sendMail({
            from: 'HeartBars <heartbarsmailer@gmail.com>',
            to: req.body.email,
            subject: '♥ ' +req.body.reqFromName +' has sent you a HeartBars quiz!',
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
    }
  });
}
