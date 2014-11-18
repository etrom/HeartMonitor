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
  console.log(req.body, 'req.body')
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    console.log('user', user)
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
console.log(req.params, 'the params')
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

exports.showWholeUser = function (req, res, next) {
  var userId = req.params.id;
console.log(req.params, 'the params')
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

//find user by email
exports.findExisting = function (req, res, next) {

  User.find({email: req.body.email}, function (err, partner) {
    if(err) { return handleError(res, err); }
    User.findOneAndUpdate({ _id:partner[0]._id},{requests: true, reqFrom: req.params.id}, function(err,user) {
        if(err) {return res.send(500, err)};
    });
    if(partner.length < 1) {
      return res.json(200);
    }
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
      console.log('success')
      res.json(200, user);
    });
  } else {
    User.findOneAndUpdate({ _id:req.params.id},{requests: false, reqFrom: '', partner: {}}, function(err,user) {
      if(err) {return res.send(500, err)};

        res.json(200, user);
    });
  }
};

////update reqFrom request
exports.updateRequest = function(req,res){
  User.findOneAndUpdate({ _id:req.params.id},{requests: true, reqFrom: req.params.reqFrom}, function(err,user) {
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
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
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
