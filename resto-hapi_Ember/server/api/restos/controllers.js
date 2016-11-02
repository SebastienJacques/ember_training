'use strict';

let model = require('./model');
let logger = require(`${process.cwd()}/utils/logger`);

exports.get = function(req, res) {
    logger.log("GET restos controller");

    model.find()
    .then(function(docs){
        let restos = [];
        // manip to edit the JSON format to fit with the format needed by Ember
        docs.map(function(restoFromDb){
            let resto = {
                type: "restos",
                id: restoFromDb._id,
                attributes: restoFromDb
            };
            restos.push(resto);
        });
        res({data: restos});
        // res(docs);
        // res({
        //     "data": [
        //         {
        //             "type": "restos",
        //             "id": "GRID-1-20160429171514.897",
        //             "attributes": {}
        //         }
        //     ]
        // })
    });
};

exports.post = function(req, res) {
    logger.log("POST resto controller");

    //create a new model with data from the request
    let resto = new model(req.payload);

    resto.save(function(err, data) {
        if(err) {
            res({error_code: 1, err_desc: err});
            logger.warn(err);
            return;
        }
        res({error_code: 0, message: 'Resto saved'});
    });
};

exports.update = function(req, res) {
    logger.log("UPDATE resto controller");

    model.findByIdAndUpdate(req.payload._id, req.payload,
        function(err, data){
            if(err) {
                res({error_code: 1, err_desc: err});
                logger.warn(err);
                return;
            }
            res({error_code: 0, message: 'Resto updated'});
            logger.log(data);
        }
    );
};

exports.deleteById = function(req, res) {
    logger.log("DELETE resto controller");

    model.findByIdAndRemove(req.params.id,
        function(err, data) {
            if (err) {
                res({error_code:1,err_desc:err});
                logger.warn(err);    
                return;
            }
            res({error_code:0,message: 'Resto deleted'});
            logger.log(data);
        }
    );
};

exports.dynamicSearch = function(req, res) {
    logger.log("dynamicSearch resto controller");

    let query = req.query;
    console.log(req.query);
    model.find(query)
    .then(function(docs){
        // we have a corresponding result
        if(docs.length) {
            res({error_code:0,data: docs});
        } else {
            res({error_code:1,err_desc:`No result for the query ${JSON.stringify(query)}`});
        }
    });
};