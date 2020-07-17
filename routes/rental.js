const express=require('express');
const router=express();
const {Rental,validate}=require('../models/rental');
const {Customer}=require('../models/customer');
const {Book}=require('../models/book');
const Fawn=require('fawn');
const mongoose= require('mongoose');

Fawn.init(mongoose);

router.get('/',async (req,res)=>{
    const result=await Rental.find();
    if(!result) res.status(400).send('Invalid Rental ID');
    res.send(result);
})

router.post('/',async (req,res)=>{
    const {validaterental}=validate(req.body);
    if(validaterental) return res.status(400).send(validaterental.details[0].message);

    const book=await Book.findById(req.body.bookId);
    if(!book) return res.status(400).send('invalid Book ID');

    const customer =await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('invalid customer ID');

    rate=book.cost
    if(customer.isPrimeMember){
      rate=book.cost-5
    }

    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        book:{
            _id:book._id,
            title:book.title,
            cost:book.cost
        },
        Fees:rate
    });

    try {
        new Fawn.Task()
          .save('rentals', rental)
          .update('books', { _id: book._id }, { 
            $inc: { purchasedBy: 1 }
          })
          .run();
      
        res.send(rental);
      }
      catch(ex) {
        res.status(500).send('Something failed.');
      }
});

router.get('/:id',async (req,res)=>{
    const rental=await Rental.findById(req.params.id);
    if(!rental) return res.status(400).send('Invalid Rental ID');

    res.send(rental);
});


module.exports=router;