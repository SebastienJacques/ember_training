'use strict';

let config = {
    logging: true,
    seed: true,
    //if PORT env is defined we use it otherwise we use 3000 port
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_DEV || 'development',
}

module.exports = config;