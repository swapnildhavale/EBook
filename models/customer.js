const mongoose=require('mongoose');
const joi=require('joi');

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:30
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:12,
        required:true
    },
    isPrimeMember:{
        type:Boolean,
        default:false
    },
    joinedOn:{
        type:Date,
        default:Date.now
    }
}); 

const Customer=mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema={
        name:joi.string().required().max(30),
        phone:joi.number().required().min(10).max(12)
    };
    return joi.validate(validateCustomer,schema);
}

module.exports.validate=validateCustomer;
module.exports.Customer=Customer;
module.exports.customerSchema=customerSchema;