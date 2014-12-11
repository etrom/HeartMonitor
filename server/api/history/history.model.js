'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    sequencer = require('../modelUtils/sequencer');

var HistorySchema = new Schema({
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  active: {type: Boolean, default: true},
  type: String,
  key: Number,
  points: Number,
  iqTitle: String, // for instagram phot quiz
  historyObj: {},
  responseObj: {},
  created: Date,
  responseDate: Date
});

HistorySchema.pre('save', function(next) {
  if(this.create ===  undefined) {
    this.created = Date.now();
  }
  next();
});
HistorySchema.pre('save', function(next) {
  var self = this ;
  sequencer.getNext('History', function(id){
    self.key = id;
    next();
  });
});

module.exports = mongoose.model('History', HistorySchema);