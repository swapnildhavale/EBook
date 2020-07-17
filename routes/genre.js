const express=require('express');
const router=express();
const {Genre,validate}=require('../models/genre');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');

router.get('/',async (req,res)=>{
    const result=await Genre.find().sort('name');
    res.send(result);
});

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre=new Genre({
        name:req.body.name
    });

    var result=await genre.save();
    res.send(result);
    
});

router.put('/:id',async (req,res)=>{
    let {validateresult}=validate(req.body);
    if(validateresult) return res.status(400).send(validateresult.details[0].message);

    let genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
});


router.delete('/:id',[auth,admin],async (req,res)=>{
    let genre=await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('The Genre with given Id was not present.');

    res.send(genre);
});

router.get('/:id',async (req,res)=>{
    let genre=await Genre.findById(req.params.id);
    if(!genre) return res.status(400).send("Invalid Genre Id");

    res.send(genre);
})


module.exports=router;