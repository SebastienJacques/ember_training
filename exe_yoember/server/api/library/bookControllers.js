'use strict';

let logger = require(`${process.cwd()}/utils/logger`);
let utils = require(`${process.cwd()}/utils/utils`)
let model = require('./model');

let Boom = require('boom');

let type = 'book';

exports.getBooks = function(req, res){
    logger.log("GET Books Controller");
    let query = {};

    if(req.query.search){
        logger.log(req.query.search);
        let regex = { "$regex": req.query.search, "$options": "i" };
        query = {'title': regex};
    }

    model.Book.find(query).populate('author')
    .then(function(docs){
        let books = [];
        docs.map(function(bookFromDb){
            let book = {
                type: type,
                id: bookFromDb._id,
                attributes: bookFromDb
            };
            books.push(book);
        });
        logger.log({data: books});
        res({data: books});
    });
};

exports.postBook = function(req, res){
    logger.log("POST Book Controller");
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;
        logger.log(request);
    let book = new model.Book(request);

    // FIRST save the new book
    book.save(function(err, data) {
        logger.log("----- Save the book");
        if(err) {
            logger.warn(err.message);
            res(Boom.badRequest(err.message));
            return;
        }

        // THEN get data of the author corresponding to the id sent by ember
        let author = model.Author.findById(request.author,
            function(err, authorFromDb) {
                logger.log("----- Get the author");
                if(err){
                    res(utils.resError(type, err));
                    logger.warn(err.message);
                    return;
                }
                
                // add the id of the new saved book in the books array
                authorFromDb.books.push(book._id);
                
                // FINALLY update the author model in the DB
                author.update(authorFromDb, function(err, result){
                    logger.log("----- Update the author");
                    let attributes = {
                        message: 'Document saved'
                    };
                    logger.log(data);
                    res(utils.formatJson(type, data._id, attributes));
                });
            }
        );
    });
};

exports.getBook = function(req, res) {
    logger.log("GET Book by ID");

    model.Book.findById(req.params.id, 
        function(err, bookFromDb){
            if(err){
                res(utils.resError(type, err));
                logger.warn(err.message);
                return;
            }
            logger.log(bookFromDb);
            res(utils.formatJson(type, bookFromDb._id, bookFromDb));
        }
    );
};

exports.updateBook = function(req, res) {
    logger.log("PUT Book Controller");
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;

    logger.log(request);
    model.Book.findByIdAndUpdate(req.params.id, request,
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

exports.removeBook = function(req, res) {
    logger.log("DELETE Book Controller");

    model.Book.findByIdAndRemove(req.params.id, 
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