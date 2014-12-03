'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HistorySchema = new Schema({
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  active: Boolean,
  type: String,
  key: Number,
  object: {},
  created: Date
});

HistorySchema.pre('save', function(next) {
  if(this.create === '') {
    this.created = Date.now();
  }
  next();
});

module.exports = mongoose.model('History', HistorySchema);