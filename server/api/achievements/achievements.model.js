'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AchievementsSchema = new Schema({
  title: String,
  number: Number,
  achieved: Boolean,
  criteria: {},
  achievedDate: Date

});

module.exports = mongoose.model('Achievements', AchievementsSchema);