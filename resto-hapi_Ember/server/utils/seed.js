'use strict';

let Resto = require('../api/restos/model');

let _ = require('lodash');
let logger = require('./logger');

logger.log('Seed is active');

let restos = [
    {
        name: 'jade de chine',
        address: {
            street: "Rue d'Havré",
            number: 23,
            zip: 7000,
            town: "Mons",
            country: "Belgium"
        },
        phone : "+32 40 25 78 96",
        cooktype: ["asiatique", "Vientamienne"],
        comments: ["excellent", "superbe ambiance"],
        pictures: [{
            title: 'Nouvel an chinois',
            link: 'jade2016.jpg'
        }, {
            title: 'Nouvel an chinois',
            link: 'jade2015.jpg'
        }],
        rating : 7,
        url: 'http://www.jadechine.be',
        createdat: Date.now()
    },{
        name: 'La bergerie',
        address: {
            street: "Rue des canadiens",
            number: 239,
            zip: 7020,
            town: "Hyon",
            country: "Belgium"
        },
        phone : "+32 25 68 45 95",
        cooktype: ["grecque", "française"],
        comments: ["pas bon", "moyen qualité"],
        pictures: [{
            title: 'Nouvel',
            link: 'bergerie2016.jpg'
        }, {
            title: 'Mes 40 ans',
            link: 'bergerie2015.jpg'
        }],
        rating : 6,
        url: 'http://www.jadechine.be',
        createdat: Date.now()
    },{
        name : "Delices Chinois",
        phone : "+32 65 56 78 89",
        pictures: [{
            title: 'Resto 01',
            link : "resto-01.jpg",
        }],
        url : "www.deliceschinois.com",
        rating : 7,
        cooktype : ["chinoise"],
        address : {
            street : "Rue du vase",
            number : 77,
            town : "Mons",
            zip : 7000,
            country : "Belgium"
        },
        createdat: Date.now()
    }
];



let createDoc = function(model, doc) {
    // use the promise to manage what we do after
    return new Promise(function(resolve, reject) {
        // prepare data in function of the model and save it into the db
        new model(doc).save(function(err, saved) {
            // if errors send it and stop the process (reject) else save the doc
            return err ? reject(err) : resolve(saved);
        });
    });
};

let cleanDB = function() {
    logger.log('... cleaning the DB');
    // clean thx to the model imported at the begining of the file
    var cleanPromises = [Resto]
        // list and remove all resto corresponding to the model
        .map(function(model) {
            return model.remove().exec();
        });
    // when all promises corresponding to "cleanPromises are done, the function is finished
    return Promise.all(cleanPromises);
};

let createRestos = function(data) {
    logger.log('... Adding restos to the DB');
    var promises = restos.map(function(resto) {
        return createDoc(Resto, resto);
    });

    return Promise.all(promises)
        .then(function(restos) {
            // return all data merged thx to lodash
            return _.merge({
                restos: restos
                // or if no data return a void object
            }, data || {});
        });
};

cleanDB()
    .then(createRestos)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));