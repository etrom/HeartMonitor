'use strict';

var _ = require('lodash');
var History = require('./history.model');

// Get list of historys
exports.index = function(req, res) {
  History.find(function (err, historys) {
    if(err) { return handleError(res, err); }
    return res.json(200, historys);
  });
};

// Get a single history
exports.show = function(req, res) {
  // History.find({ user:req.params.id }, function (err, history) {
  History.findById(req.params.id, function (err, history) {
    console.log('ding');
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    return res.json(history);
  });
};

// Creates a new history in the DB.
exports.create = function(req, res) {
  History.create(req.body, function(err, history) {
    if(err) { return handleError(res, err); }
    return res.json(201, history);
  });
};

// updates with response data and makes inactive
// exports.update = function(req, res) {
//   console.log(req.body.responseObj, 'here');
//     History.findOneAndUpdate({ user:req.params.id},{responseObj: req.body.responseObj, responseDate: req.body.responseDate, active: false}, function(err,history) {
//       console.log(history)
//      if(err) {return res.send(500, err)};
//     res.json(200, history);
//   })
// };

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
    History.findOneAndUpdate({ _id:req.params.id},{responseObj: req.body.responseObj, responseDate: req.body.responseDate, active: false}, function(err,history) {
      console.log(history)
     if(err) {return res.send(500, err)};
    res.json(200, history);
  })
};


// Deletes a history from the DB.
exports.destroy = function(req, res) {
  History.findById(req.params.id, function (err, history) {
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    history.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}