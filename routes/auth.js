const express=require('express');
const router = express();
const Joi=require('joi');
const {User}=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');

router.post('/', async(req,res)=>{
    const {validateAuth}=validate(req.body);
    if(validateAuth) return res.status(400).send(validateAuth.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid Email');

    const result=bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ _id:user._id, isAdmin: user.isAdmin },config.get('jwtPrivateKey'));
    res.send(token);
});


function validate(request){
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().required()
    };
    return Joi.validate(request,schema)
}

module.exports=router