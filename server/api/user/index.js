'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.post('/bar/:id', auth.isAuthenticated(), controller.addPercent)
router.post('/findExisting/:id', auth.isAuthenticated(), controller.findExisting)
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/whole/:id', controller.showWholeUser);
router.post('/', controller.create);
router.post('/:id/confirmPartner/:reqFrom', auth.isAuthenticated(), controller.addPartner)
router.post('/:id/requestPartner/:reqFrom', auth.isAuthenticated(), controller.updateRequest)
module.exports = router;
