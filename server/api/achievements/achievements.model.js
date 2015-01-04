'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AchievementsSchema = new Schema({
  title: String,
  achieved: {type: Boolean, default: false},
  criteria: {},
  achievedDate: Date,
  points: Number,
  actionType: String

});

module.exports = mongoose.model('Achievements', AchievementsSchema);