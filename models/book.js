const mongoose=require('mongoose');
const joi = require('joi');
const {genreSchema}=require('../models/genre');

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    purchasedBy:{
        type:Number
    },
    cost:{
        type:Number
    }
});

const Book=mongoose.model('Book',bookSchema);

function validateBook(book){
    const schema={
        title:joi.string().required(),
        author:joi.string().required(),
        genre:joi.object().required(),
        purchasedBy:joi.number().required(),
        cost:joi.number().required()
    };
    return joi.validate(schema,book);
}

module.exports.validate=validateBook;
module.exports.Book=Book;
module.exports.bookSchema=bookSchema;

