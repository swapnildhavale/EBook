const mongoose=require('mongoose');
const joi= require('joi');

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

const Genre=mongoose.model('Genre',genreSchema);

function validateGenre(genre){
    const schema={
        name:joi.string().required()
    }   
    return joi.validate(genre,schema);
}

module.exports.Genre=Genre;
module.exports.validate=validateGenre;
module.exports.genreSchema=genreSchema;