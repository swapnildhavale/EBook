const express=require('express');
const router=express();
const {Book,validate}=require('../models/book');
const {Genre}=require('../models/genre');

router.get('/',async(req,res)=>{
    const books=await Book.find().sort('title');
    res.send(books);
});

router.post('/',async (req,res)=>{
    const {validatebook}=validate(req.body);
    if(validatebook) return res.status(400).send(validatebook.details[0].message);

    const genre=await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genreId');

    let book=new Book({
        title:req.body.title,
        author:req.body.author,
        genre:{
            _id:genre.id,
            name:genre.name
        },
        purchasedBy:req.body.purchasedBy,
        cost:req.body.cost
    });
    let result=await book.save();
    res.send(result);
});

router.put("/:id",async (req,res)=>{
    const {validatebook}=validate(req.body);
    if(validatebook) return res.status(400).send(validatebook.details[0].message);

    let genre=await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre Id');

    let book=await Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        author:req.body.author,
        genre:{
            _id:genre.id,
            name:genre.name
        },
        purchasedBy:req.body.purchasedBy,
        cost:req.body.cost
    },{new:true});
    if(!book) return res.status(400).send('Invalid Movie Id');

    let result =await book.save();
    res.send(result);
});

router.delete('/:id',async (req,res)=>{
    let result=await Book.findByIdAndDelete(req.params.id);
    if(!result) return res.status(400).send('Invalid Movie Id');
    res.send(result);
});

router.get('/:id',async (req,res)=>{
    const result=await Book.findById(req.params.id);
    if(!result) return res.status(400).send('Invalid Movie ID');

    res.send(result);
});

module.exports=router;