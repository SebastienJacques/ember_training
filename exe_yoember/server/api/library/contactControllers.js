'use strict';

let logger = require(`${process.cwd()}/utils/logger`);
let utils = require(`${process.cwd()}/utils/utils`)
let model = require('./model');

let Boom = require('boom');

let type = 'contact';

exports.getContacts = function(req, res) {
    logger.log('GET Contacts Controller');

    let query = {};

    if(req.query.search){
        logger.log(req.query.search);
        let regex = { "$regex": req.query.search, "$options": "i" };
        query = { $or: [
            {'email': regex},
            {'message': regex}
        ]};
    }

    model.Contact.find(query)
    .then(function(docs){
        let contacts = [];

        docs.map(function(contactFromDb){
            let contact = {
                type: type,
                id: contactFromDb._id,
                attributes: contactFromDb
            };
            contacts.push(contact);
        });
        logger.log({data: contacts});
        res({data: contacts});
    });
};

exports.postContact = function(req, res) {
    logger.log('POST Contact Controller');
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;

    let contact = new model.Contact(request);

    contact.save(function(err, data) {
        if(err) {
            logger.warn(err.message);
            res(Boom.badRequest(err.message));
            return;
        }
        let attributes = {
            message: 'Document saved'
        };
        logger.log(data);
        res(utils.formatJson(type, data._id, attributes));
    });
};