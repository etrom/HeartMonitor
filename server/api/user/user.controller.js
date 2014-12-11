'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  /*
  var bars = req.body.bars;
  delete req.body.bars;
  */
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
  /*
  async.each(bars, function(bar, done) {
    Bar.create(bar, done);
  }, function() {
    newUser.save(function(err, user) {
    if (err) return validationError(res, err);
      var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    });
  })
  */
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

// getBars

exports.getBars = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.bars);
  });
};

//find user by email
exports.findExisting = function (req, res, next) {

  User.find({email: req.body.email}, function (err, partner) {
    if(err) { return handleError(res, err); }
    if(partner.length < 1) {
      return res.json(200);
    }
    User.findOneAndUpdate({ _id:partner[0]._id},{requests: true, reqFrom: req.params.id}, function(err,user) {
        if(err) {return res.send(500, err)};
    });

     res.json(200, partner);

  });
};



//add a partner
exports.addPartner = function(req,res) {
  if (req.body.acceptance) {
    User.findOneAndUpdate({ _id:req.params.id},{requests: false, reqFrom: '', partner: req.params.reqFrom}, function(err,user) {
      if(err) {return res.send(500, err)};
    });
    User.findOneAndUpdate({ _id:req.params.reqFrom},{requests: false, reqFrom: '', partner: req.params.id}, function(err,user) {
      if(err) {return res.send(500, err)};
      res.json(200, user);
    });
  } else {
    User.findOneAndUpdate({ _id:req.params.id},{requests: false, reqFrom: '', partner: {}}, function(err,user) {
      if(err) {return res.send(500, err)};

        res.json(200, user);
    });
  }
};

////update bar increase request
exports.updateBarRequest = function(req,res){
  User.findOne({ _id:req.body.userId}, function(err,user) {
    var new_req = {
      //add type when it exists
      historyId: req.body.historyId,
      actionType: req.body.actionType,
      points: req.body.increment,
      dateSent: Date.now()
    };

    console.log(new_req)
    user.actionRequests.push(new_req);
    user.save(function(err, savedUser, numModified) {
      if(err) {return res.send(500, err)};
      if (req.body.quizNum){
        User.findOne(user.partner, function(err,partner){
          console.log(req.body.quizNum);
          partner.points += 30;
          partner.quizNumber += req.body.quizNum;
          partner.save(function(err, savedUser, numModified){
          })
        })
      }
      res.json(200, savedUser);
    });


  })
};

////update reqFrom request
exports.updateRequest = function(req,res){
  User.findOneAndUpdate({ _id:req.params.id},{requests: true, reqFrom: req.params.reqFrom}, function(err,user) {
    // , reqFrom: req.params.

    if(err) {return res.send(500, err)};
    res.json(200, user);
  })
};

exports.removeAction = function(req,res){
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err,user) {
    // , reqFrom: req.params.
    var index ='';
    for (var i = 0, len = user.actionRequests.length; i < len; i++) {
      if(user.actionRequests[i].historyId == req.params.action) {
        len = index = i;
      }
    }
    user.actionRequests.splice(index, 1);
    user.save(function (err) {
      if (err) {return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

exports.updateProfilePic = function(req,res){
  User.findOneAndUpdate({ _id:req.params.id},{profilePic: req.body.profilePic}, function(err,user) {
    // , reqFrom: req.params.
    if(err) {return res.send(500, err)};
    res.json(200, user);
  })
};
/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

//add bar percentage
exports.addPercent = function(req, res){
  var name = req.body.barName;
  User.findById(req.params.id, function(err,user) {
    if(err) {return res.send(500, err)};
    for(var i=0; i < user.bars.length; i++){
      if (user.bars[i].name === name){
        user.bars[i].fulfillment += parseInt(req.body.fulfillment);
        if (user.bars[i].fulfillment > 100){
          user.bars[i].fulfillment = 100;
        }
      }
      if (user.bars[i].fulfillment >= 65){
          user.reminded = false;
        }
    }
      user.save();
      res.json(200, user);
    });
};

exports.saveQuiz = function(req,res) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    if (err) { return handleError(res, err); }
    user.quizCurrent = req.body.quizCurrent;
    user.save(function (err) {
          if (err) {
            return handleError(res, err);
          }
          return res.json(200, user);
        });
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword').populate('partner').populate('actionRequests').exec(function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
