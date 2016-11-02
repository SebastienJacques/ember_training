'use strict';

let server = require(`${process.cwd()}/server`);
let controllers = require(`./controllers`);
let logger = require(`${process.cwd()}/utils/logger`);

module.exports = [
    {
        method: 'GET',
        path: '/api/restos',
        handler: controllers.get
    },{
        method: 'POST',
        path: '/api/restos',
        handler: controllers.post
    },{
        method: 'PUT',
        path: '/api/restos',
        handler: controllers.update
    },{
        method: 'GET',
        path: '/api/restos/search',
        handler: controllers.dynamicSearch
    },{
        method: 'DELETE',
        path: '/api/restos/{id}',
        handler: controllers.deleteById
    }
]