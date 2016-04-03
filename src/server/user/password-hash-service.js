'use strict';

var crypto = require('crypto');

function getHash(password) {
    var sha = crypto.createHash('sha256');
    sha.update(password);
    return sha.digest('hex');
}

exports.getHash = getHash;