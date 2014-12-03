'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    sequencer = require('../modelUtils/sequencer')(mongoose);

var QuizSchema = new Schema({
  seq: Number,
  questions: [String],
  createdby: { type: Schema.Types.ObjectId, ref: 'User'}
});

QuizSchema.pre('save', function(next) {
  var self = this ;
  sequencer.getNext('Quiz', function(id){
    self.seq = id;
    next();
  });
});

module.exports = mongoose.model('Quiz', QuizSchema);