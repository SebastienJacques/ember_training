'use strict';

let server = require(`${process.cwd()}/server`);
let logger = require(`${process.cwd()}/utils/logger`);

let controllers = require(`./controllers`);
let invitationControllers = require('./invitationControllers');
let contactControllers = require('./contactControllers');
let bookControlles = require('./bookControllers');
let authorControllers = require('./authorControllers');

module.exports = [
    // LIBRARIES
    {
        method: 'GET',
        path: '/api/libraries',
        handler: controllers.getLibraries
    },{
        method: 'GET',
        path: '/api/libraries/{id}',
        handler: controllers.getLibrary
    },{
        method: 'POST',
        path: '/api/libraries',
        handler: controllers.postLibrary
    },{
        method: 'PATCH', // Ember use PATCH in place of PUT
        path: '/api/libraries/{id}',
        handler: controllers.updateLibrary
    },{
        method: 'DELETE',
        path: '/api/libraries/{id}',
        handler: controllers.removeLibrary
    },
    // BOOKS
    {
        method: 'GET',
        path: '/api/books',
        handler: bookControlles.getBooks
    },{
        method: 'GET',
        path: '/api/books/{id}',
        handler: bookControlles.getBook
    },{
        method: 'POST',
        path: '/api/books',
        handler: bookControlles.postBook
    },{
        method: 'PATCH', 
        path: '/api/books/{id}',
        handler: bookControlles.updateBook
    },{
        method: 'DELETE',
        path: '/api/books/{id}',
        handler: bookControlles.removeBook
    },
    // AUTHORS
    {
        method: 'GET',
        path: '/api/authors',
        handler: authorControllers.getAuthors
    },{
        method: 'GET',
        path: '/api/authors/{id}',
        handler: authorControllers.getAuthor
    },{
        method: 'POST',
        path: '/api/authors',
        handler: authorControllers.postAuthor
    },{
        method: 'PATCH',
        path: '/api/authors/{id}',
        handler: authorControllers.updateAuthor
    },{
        method: 'DELETE',
        path: '/api/authors/{id}',
        handler: authorControllers.removeAuthor
    },
    // INVITATIONS
    {
        method: 'GET',
        path: '/api/invitations',
        handler: invitationControllers.getInvitations
    },{
        method: 'POST',
        path: '/api/invitations',
        handler: invitationControllers.postInvitation
    },
    // CONTACTS
    {
        method: 'GET',
        path: '/api/contacts',
        handler: contactControllers.getContacts
    },{
        method: 'POST',
        path: '/api/contacts',
        handler: contactControllers.postContact
    }
];