'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let validate = require('mongoose-validator');

let libraryModel = function() {
    let Library = Schema({
        name: {
            type: String,
            lowercase: true
        },
        address: {
            type: String
        },
        phone: {
            type: String,
            lowercase: true
        },
        books: [{
            type: Schema.Types.ObjectId, 
            ref: 'book' 
        }]
    });

    let Book = Schema({
        title: {
            type: String,
            lowercase: true
        },
        releaseyear: {
            type: Date
        },
        author: {
            type: Schema.Types.ObjectId, 
            ref: 'author' 
        }
    });

    let Author = Schema({
        name: {
            type: String,
            lowercase: true
        },
        books: [{
            type: Schema.Types.ObjectId, 
            ref: 'book' 
        }]
    });

    let Invitation = Schema({
        email: {
            type: String,
            lowercase: true
        }
    });

    let Contact = Schema({
        email: {
            type: String,
            lowercase: true
        },
        message: {
            type: String
        }
    });

    Library.pre('save', function(next) {
        let self = this;
        this.constructor.find({
            'address': self.address
        }, function(err, docs) {
            if(!docs.length) {
                next();
            } else {
                next(new Error("Library exists !"));
            }
        });
    });

    Invitation.pre('save', function(next) {
        let self = this;
        this.constructor.find({
            'email': self.email
        }, function(err, docs) {
            if(!docs.length) {
                next();
            } else {
                next(new Error("Email exists !"));
            }
        });
    });

    Contact.pre('save', function(next) {
        let self = this;
        this.constructor.find({
            'message': self.message
        }, function(err, docs) {
            if(!docs.length) {
                next();
            } else {
                next(new Error("Message exists !"));
            }
        });
    });

    let Base = mongoose.model('library', Library, 'libraries');
    let exports = module.exports = Base;
    Base.Book = mongoose.model('book', Book, 'books');
    Base.Author = mongoose.model('author', Author, 'authors');
    Base.Invitation = mongoose.model('invitation', Invitation, 'invitations');
    Base.Contact = mongoose.model('contact', Contact, 'contacts');

    return Base;
};

module.exports = new libraryModel();