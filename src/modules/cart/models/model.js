'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({
    sku: {
        type: String,
        required: 'Please fill a Product Item SKU',
    },
    qty:{
        type: Number,
        default: 1
    },
    name: {
        type: String,
        required: 'Please fill a Product Item',
    },
    price: {
        type: Number,
        required: 'Please fill a Product price',
    },
    product_type:{
        type: String,
        enum: ['simple', 'downloadable', 'configurable', 'bundle'],
        default: 'simple'
    },
    quote_id: {
        type: String,
        required: 'Please fill a Quote id',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Cart", CartSchema);