'use strict';

let logger = require(`${process.cwd()}/utils/logger`);
let utils = require(`${process.cwd()}/utils/utils`)
let model = require('./model');
// to create custom error messages compatible with hapi-json-api module to send to ember
let Boom = require('boom');

let type = 'library';

exports.getLibraries = function(req, res){
    logger.log("GET Libraries Controller");
    // set query to void to list all data if we are not searching for specific therms
    let query = {};
    // if the user search for a particular therm
    if(req.query.search){
        logger.log(req.query.search);
        // create a regex to find data containing at least the query
        let regex = { "$regex": req.query.search, "$options": "i" };
        // create query to search for all keys in the model
        query = { $or: [
            {'name': regex},
            {'address': regex},
            {'phone': regex}
        ]};
    }
    
    // use the populate to auto fill the "books" array with informations of corresponding books inside the Book collection
    model.find(query).populate('books')
    .then(function(docs){
        // manip to create a document compatible with the json-api format for ember
        let libraries = [];
        docs.map(function(libraryFromDb){
            let library = {
                type: type,
                id: libraryFromDb._id,
                attributes: libraryFromDb
            };
            libraries.push(library);
        });
        logger.log({data: libraries});
        res({data: libraries});
    });
};

exports.postLibrary = function(req, res){
    logger.log("POST Library Controller");
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;
    let library = new model(request);

    library.save(function(err, data) {
        if(err) {
            logger.warn(err.message);
            res(Boom.badRequest(err.message));
            return;
        }
        let attributes = {
            message: 'Document saved'
        };
        logger.log(data);
        // use a custom function from the utils file to avoid redundancy
        res(utils.formatJson(type, data._id, attributes));
    });
};

exports.getLibrary = function(req, res) {
    logger.log("GET Library by ID");

    model.findById(req.params.id, 
        function(err, libraryFromDb){
            if(err){
                logger.warn(err.message);
                res(Boom.badRequest(err.message));
                return;
            }
            logger.log(libraryFromDb);
            res(utils.formatJson(type, libraryFromDb._id, libraryFromDb));
        }
    );
};

exports.updateLibrary = function(req, res) {
    logger.log("PUT Library Controller");
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;

    logger.log(request);
    model.findByIdAndUpdate(req.params.id, request,
        function(err, data) {
            if(err) {
                logger.warn(err.message);
                res(Boom.badRequest(err.message));
                return;
            }
            let attributes = {
                message: 'Document updated'
            };
            logger.log(data);
            res(utils.formatJson(type, data._id, attributes));
        }
    );
};

exports.removeLibrary = function(req, res) {
    logger.log("DELETE Library Controller");

    model.findByIdAndRemove(req.params.id, 
        function(err, data) {
            if(err) {
                logger.warn(err.message);
                res(Boom.badRequest(err.message));
                return;
            }
            let attributes = {
                message: 'Document deleted'
            };
            logger.log(data);
            res(utils.formatJson(type, data._id, attributes));
        }
    );
};