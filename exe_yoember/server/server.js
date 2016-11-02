'use strict';

let Hapi = require('hapi');
let config = require(`${process.cwd()}/config/config`);
let logger = require(`${process.cwd()}/utils/logger`);
let db = require(`${process.cwd()}/utils/db`);

let server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: config.port,
    routes: {
        cors: true
    }
});

db.config();

if(config.seed){
    require(`${process.cwd()}/utils/seed`);
}

server.register({
    // module to rewrite Boom errors from routes to be json api compliant
    register: require('@gar/hapi-json-api'),
    options: {}
}, (err) => {
    if(err) {
        logger.warn(err);
    }
    server.route(require(`${process.cwd()}/api/library/routes`));
});


server.start(function() {
    logger.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;