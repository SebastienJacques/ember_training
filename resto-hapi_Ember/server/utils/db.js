'use strict';

let mongoose = require('mongoose');
let logger = require(`${process.cwd()}/utils/logger`);

let db = function() {
    return {
        config: function(){
            mongoose.connect('mongodb://localhost/restos');
            let db = mongoose.connection;
            // use .bind to add the content of the console.log after the message
            db.on('error', logger.warn.bind(logger, 'Connection Error:'));
            db.once('open', function() {
                logger.log("You are connected to the DB !")
            });
        }
    };
};

module.exports = db();