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
        // allow direct access from ember to the port 3000
        cors: true
    }
});

db.config();

if(config.seed) {
    require(`${process.cwd()}/utils/seed`);
}

// call the routes created in the api folder
server.route(require(`${process.cwd()}/api/restos/routes`));  

server.start(function() {
    logger.log('Server running at:', server.info.uri);
});

module.exports = server;