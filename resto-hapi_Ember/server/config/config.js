'use strict';

let path = require('path');

let config = {
    logging : true,
    seed : true,
    rootPath: path.normalize(__dirname + '/..'),
    //if PORT env if defined we use it otherwise we use 3000 port
    port: parseInt(process.env.PORT, 10) || 3000,
    evironment: process.env.NODE_ENV || 'development',
    // we can add here some option when we built hapi api
    hapi: {
        options: {

        }
    }
}

module.exports = config;