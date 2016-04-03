'use strict';

var Room = require('./room-model');

exports.createRoom = function (name) {
    return Room.create({ name: name });
};

exports.getRooms = function () {
    return Room.find();
};
