"use strict";
let Library = require('../api/library/model');
let logger = require(`./logger`);
let _ = require('lodash');

let libraries = [
    {
        "name": "Bosco and Sons",
        "address": "674 Herman Heights, Ariannaton",
        "phone": "220.670.5411",
        "books": ["57ed27633c1f353bf7a74d53", "57ed27633c1f353bf7a74d54"]
    },{
        "name": "Leannon LLC",
        "address": "763 Electa Parkway, New Eveline",
        "phone": "305-686-4919",
        "books": ["57ed27633c1f353bf7a74d55"]
    },{
        "name": "Quitzon Inc",
        "address": "6881 Katrine Creek, North Darron",
        "phone": "(061) 921-7075",
        "books": ["57ed27633c1f353bf7a74d54", "57ed27633c1f353bf7a74d55"]
    }
];

let invitations = [
    {
        "email": "monmail@gmail.com"
    },{
        "email": "toto@gmail.com"
    },{
        "email": "tata@gmail.com"
    }
];

let contacts = [
    {
        "email": "monmail@gmail.com",
        "message": "Hello !"
    },{
        "email": "toto@gmail.com",
        "message": "Nice app !"
    }
];

let authors = [
    {
        "_id": "57ee6f9f39329031d219b485",
        "name": "Phoebe Crona",
        "books": ["57ed27633c1f353bf7a74d54"]
    },{
        "_id": "57ee6f9f39329031d219b486",
        "name": "Vivien Lind",
        'books': ['57ed27633c1f353bf7a74d53', '57ed27633c1f353bf7a74d55']
    },{
        "_id": "57ee6f9f39329031d219b487",
        "name": "Hillard Schneider",
        "books": []
    }
];

let books = [
    {
        "_id": "57ed27633c1f353bf7a74d53",
        "title": "Incredible Steel Mouse Cookbook",
        "releaseyear": new Date("2006"),
        "author": "57ee6f9f39329031d219b486"
    },{
        "_id": "57ed27633c1f353bf7a74d54",
        "title": "Sleek Cotton Hat Cookbook",
        "releaseyear": new Date("2005"),
        "author": "57ee6f9f39329031d219b485"
    },{
        "_id": "57ed27633c1f353bf7a74d55",
        "title": "Small Fresh Table Cookbook",
        "releaseyear": new Date("1938"),
        "author": "57ee6f9f39329031d219b486"
    }
];

let cleanDB = function() {
    logger.log('SEED : Cleaning the DB');
    let cleanPromises = [Library]
        .map(function(model) {
            let remove = model.remove().exec();
            remove.invitations = model.Invitation.remove().exec();
            remove.contacts = model.Contact.remove().exec();
            remove.books = model.Book.remove().exec();
            remove.authors = model.Author.remove().exec();
            return remove;
        });
    return Promise.all(cleanPromises);
};

let createDoc = function(model, doc) {
    logger.log("SEED : Creating Doc");
    return new Promise(function(resolve, reject) {
        new model(doc).save(function(err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};

let createLibraries = function(data) {
    logger.log("SEED : Creating Library");
    let promises = libraries.map(function(library) {
        return createDoc(Library, library);
    });

    return Promise.all(promises)
        .then(function(libraries) {
            return _.merge({
                libraries: libraries
            }, data || {});
        });
};

let createAuthors = function(data) {
    logger.log("SEED : Creating Authors");
    let promises = authors.map(function(author) {
        return createDoc(Library.Author, author);
    });

    return Promise.all(promises)
        .then(function(authors) {
            return _.merge({
                authors: authors
            }, data || {});
        });
};

let createBooks = function(data) {
    logger.log("SEED : Creating Books");
    let promises = books.map(function(book) {
        return createDoc(Library.Book, book);
    });

    return Promise.all(promises)
        .then(function(books) {
            return _.merge({
                books: books
            }, data || {});
        });
};

let createInvitations = function(data) {
    logger.log("SEED : Creating Invitation");
    let promises = invitations.map(function(invitation) {
        return createDoc(Library.Invitation, invitation);
    });

    return Promise.all(promises)
        .then(function(invitations) {
            return _.merge({
                invitations: invitations
            }, data || {});
        });
};

let createContacts = function(data) {
    logger.log("SEED : Creating Contacts");
    let promises = contacts.map(function(contact) {
        return createDoc(Library.Contact, contact);
    });

    return Promise.all(promises)
        .then(function(contacts) {
            return _.merge({
                contacts: contacts
            }, data || {});
        });
};

cleanDB()
    .then(createLibraries)
    .then(logger.log.bind(logger))
    .then(createInvitations)
    .then(logger.log.bind(logger))
    .then(createContacts)
    .then(logger.log.bind(logger))
    .then(createAuthors)
    .then(logger.log.bind(logger))
    .then(createBooks)
    .then(logger.log.bind(logger));