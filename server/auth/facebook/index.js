'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me', 'user_status', 'user_relationships', 'user_friends', 'public_profile', 'offline_access', 'read_friendlists'],
    // get: {'me/friends': 'me/friends'},
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    // successRedirect: '/home',  // made change in the auth.service.js b/c redirect happens before setTokenCookie
    session: false
  }), auth.setTokenCookie);

module.exports = router;