"use strict";

let logger = require('./logger');

module.exports = {  
    formatJson: function(type, id, attributes) {
        return `{ "data": {"type": "${type}","id": "${id}","attributes": ${JSON.stringify(attributes)}}}`
    }
}