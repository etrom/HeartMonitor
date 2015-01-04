'use strict';

var _ = require('lodash');
var Achievements = require('./achievements.model');

// Get list of achievementss
exports.index = function(req, res) {
  Achievements.find(function (err, achievementss) {
    if(err) { return handleError(res, err); }
    return res.json(200, achievementss);
  });
};

// Get a single achievements
exports.show = function(req, res) {
  Achievements.findById(req.params.id, function (err, achievements) {
    if(err) { return handleError(res, err); }
    if(!achievements) { return res.send(404); }
    return res.json(achievements);
  });
};

// Creates a new achievements in the DB.
exports.create = function(req, res) {
  Achievements.create(req.body, function(err, achievements) {
    if(err) { return handleError(res, err); }
    return res.json(201, achievements);
  });
};

// Updates an existing achievements in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Achievements.findById(req.params.id, function (err, achievements) {
    if (err) { return handleError(res, err); }
    if(!achievements) { return res.send(404); }
    var updated = _.merge(achievements, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, achievements);
    });
  });
};

// Deletes a achievements from the DB.
exports.destroy = function(req, res) {
  Achievements.findById(req.params.id, function (err, achievements) {
    if(err) { return handleError(res, err); }
    if(!achievements) { return res.send(404); }
    achievements.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}