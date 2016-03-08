var Room = require('./room-model');

exports.createRoom = createRoom;
exports.getRooms = getRooms;

function createRoom(name) {
    return Room.create({ name: name });
}

function getRooms() {
    return Room.find();
}