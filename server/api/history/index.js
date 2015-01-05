'use strict';

var express = require('express');
var controller = require('./history.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/user/:id', controller.getUserHistory);
router.get('/points5days/:id/:partnerid', controller.getPoints5days);
router.get('/achievements/:id/:partnerid', controller.getAchievements);

module.exports = router;