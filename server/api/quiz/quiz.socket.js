/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Quiz = require('./quiz.model');

exports.register = function(socket) {
  Quiz.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Quiz.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('quiz:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('quiz:remove', doc);
}