'use strict';

let logger = require(`${process.cwd()}/utils/logger`);
let utils = require(`${process.cwd()}/utils/utils`)
let model = require('./model');

let Boom = require('boom');

let type = 'invitation';

exports.getInvitations = function(req, res) {
    logger.log('GET Invitations Controller');
    
    let query = {};

    if(req.query.search){
        logger.log(req.query.search);
        let regex = { "$regex": req.query.search, "$options": "i" };
        query = {'email': regex};
    }

    model.Invitation.find(query)
    .then(function(docs){
        // logger.log(docs);
        let invitations = [];

        docs.map(function(invitFromDb){
            let invitation = {
                type: type,
                id: invitFromDb._id,
                attributes: invitFromDb
            };
            invitations.push(invitation);
        });
        logger.log({data: invitations});
        res({data: invitations});
    });
};

exports.postInvitation = function(req, res){
    logger.log("POST Invitation Controller");
    let request = {};
    if(req.payload.data)
        request = req.payload.data.attributes;

    let invitation = new model.Invitation(request);

    invitation.save(function(err, data) {
        if(err) {
            res(Boom.badRequest(err.message));
            logger.warn(err.message);
            return;
        }
        let attributes = {
            message: 'Document saved'
        };
        logger.log(data);
        res(utils.formatJson(type, data._id, attributes));
    });
};