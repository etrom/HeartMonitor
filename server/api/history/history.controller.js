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
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    return res.json(history);
  });
};

exports.getUserHistory = function(req, res) {
  // History.find({ user:req.params.id }, function (err, history) {
  History.find(req.params.id, function (err, history) {
    var userHistory = [];
    history.forEach(function (obj) {
      if(obj.user[0] == req.params.id){
        userHistory.push(obj);
      }
    });
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    return res.json(userHistory);
  });
};

exports.getPoints5days = function(req, res) {
  // History.find({ user:req.params.id }, function (err, history) {
  // create date range to search history documents
  var d = new Date();
  d.setDate(d.getDate()+1);
  // end date moved forward to midnight
  var end = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var dateRange = 5;
  // start date will be equal to end minus dateRange - 1
  // the minus 1 accounts for moving the setDate to midnight
  // for example:
  //   5 day range: subtract 6
  //   30 day range: subtract 30
  d.setDate(d.getDate()-dateRange+1);
  var start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var pointsData = {};

  for (var i=0; i<dateRange; i++){
    d.setDate(d.getDate()+1);
    pointsData[d.getFullYear() + ("0" + d.getMonth()).slice(-2) + ("0" + d.getDate()).slice(-2)] = 0;    
  }

  History.find({created: {$gte: start, $lt: end}}, function (err, history) {
    history.forEach(function (obj) {
      if(obj.user[0] == req.params.id) { 
        var createDate = obj.created.getFullYear() + ("0" + obj.created.getMonth()).slice(-2) + ("0" + obj.created.getDate()).slice(-2);
        var addPoints = pointsData[createDate] + obj.points;
        pointsData[createDate] = addPoints;
      } else if (obj.user[0] == req.params.partnerid && obj.responseDate !== undefined) {
        var createDate = obj.responseDate.getFullYear() + ("0" + obj.responseDate.getMonth()).slice(-2) + ("0" + obj.responseDate.getDate()).slice(-2);
        var addPoints = pointsData[createDate] + obj.partnerPoints;
        pointsData[createDate] = addPoints;
      }
    })
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    return res.json(201, pointsData);
  });
};


exports.getAchievements = function(req, res) {
  // History.find({ user:req.params.id }, function (err, history) {
  var numAchieved = 0;
  History.find(function (err, historys) {
    // console.log(historys, 'historys')
    historys.forEach(function (obj) {
      if(obj.user[0] === req.params.id) {
        numAchieved +=1;
      } else if (obj.user[0] === req.params.partnerid && obj.responseDate){
        numAchieved +=1;
      }

    })
    if(err) { return handleError(res, err); }
    console.log(numAchieved, 'num');
    return res.json(201, historys);
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
    History.findOneAndUpdate({ _id:req.params.id},{responseObj: req.body.responseObj, partnerPoints:req.body.partnerPoints, responseDate: req.body.responseDate, active: false}, function(err,history) {
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