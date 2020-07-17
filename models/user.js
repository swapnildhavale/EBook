const mongoose=require('mongoose');
const Joi=require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        required:true
    },
    isAdmin:Boolean
});

const User=mongoose.model('User',userSchema);

function validateUser(user){
    const schema={
        name:Joi.string().max(50).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).required()
    };
    return Joi.validate('user',schema);
}

module.exports.validate=validateUser;
module.exports.User=User;