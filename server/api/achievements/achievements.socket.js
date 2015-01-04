/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Achievements = require('./achievements.model');

exports.register = function(socket) {
  Achievements.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Achievements.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('achievements:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('achievements:remove', doc);
}