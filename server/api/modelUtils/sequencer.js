module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
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
  var Counters = mongoose.model('Counters', CountersSchema);

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

  return {
    getNext: getNext
  }
}


