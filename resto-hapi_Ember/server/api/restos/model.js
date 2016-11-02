'use strict';

let mongoose = require('mongoose');
let validate = require('mongoose-validator');

// Validators
let stringValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '{VALUE} should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
let numberValidator = [
    validate({
        validator : "isNumeric",
        message : "{VALUE} should be a numeric value"
    })
];
let dateValidator = [
    validate({
        validator : "isDate",
        message : "Date should be in a Date format"
    })
];
let quoteValidator = [
    validate({
        validator : "isNumeric",
        message : "{VALUE} should be a numeric value"
    }),
    validate({
        validator: 'isLength',
        arguments: [0, 10],
        message: '{VALUE} should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
let urlValidator = [
    validate({
        validator : "isURL",
        message : "The url is not valid"
    })
];

let restoModel = function() {
    let schema = mongoose.Schema({
        name : {
            type: String,
            required: true,
            lowercase: true,
            validate: stringValidator
        },
        address : {
            street: {
                type : String,
                required : true,
                lowercase: true,
                validate: stringValidator
            },
            number: {
                type : Number,
                required : true,
                validate : numberValidator
            },
            zip: {
                type : Number,
                required : true,
                validate : numberValidator
            },
            town: {
                type : String,
                required : true,
                lowercase: true,
                validate: stringValidator
            },
            country: {
                type : String,
                required : true,
                lowercase: true,
                validate: stringValidator
            }
        },
        phone : String,
        cooktype : Array,
        rating : {
            type : Number,
            validate : quoteValidator
        },
        comments : Array,
        // picture can have a variety of data type
        pictures :mongoose.Schema.Types.Mixed,
        url : {
            type : String,
            validate : urlValidator
        },
        createdat : {
            type : Date,
            required : true,
            validate : dateValidator
        },
        // updateAt will be auto updated when we modify data with the current date
        updatedat : { type : Date, default : Date.now}
    });

    // we use a hook to say "when you want to save data using the model do this before"
    schema.pre('save', function(next) {
        // to avoid a scoop problem => this self contain now the data
        var self = this;
        this.constructor.find({
            'address.street': self.address.street,
            'address.number': self.address.number,
            'address.zip': self.address.zip,
            'address.town': self.address.town,
            'address.country': self.address.country
        }, function(err, docs) {
            // if the address is different
            if (!docs.length) {
                next();
            // if the address is the same
            } else {
                next(new Error("Restaurants exists!"));
            }
        });
    });

    // we return the schema called "resto" with informations of the schema for the collection "restos" 
    return mongoose.model('resto', schema,'restos');
};

// export of the model like a singleton [export an instance of the model] so be carefull of the ()
module.exports = new restoModel();