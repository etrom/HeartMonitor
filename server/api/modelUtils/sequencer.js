var mongoose = require('mongoose');

function makeSequencer (mongooseInstance) {
  var Schema = mongooseInstance.Schema;
  var CountersSchema = new Schema({
    _id: {
      type: String,
      required: true
    },
    sequence: {
      type: Number,
      required: true
    }
  }, {
    versionKey: false
  });
  var Counters = mongooseInstance.model('Counters', CountersSchema);

  var getNext = function(collection, callback) {
    var query = {
      _id: collection
    };
    var update = {
      $inc: {
        sequence: 1
      }
    };
    var options = {
      upsert: true
    };
    Counters.findOneAndUpdate(query, update, options, function(err, counter) {
      if (err) { return handleError(res, err); }
      callback(counter.sequence);
    });
  }

  return getNext;
}



var getNext = makeSequencer(mongoose); // this makes the getNext function

module.exports = {
  getNext: getNext
};


