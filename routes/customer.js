const express=require('express');
const router=express();
const {Customer,validate}=require('../models/customer');

router.get('/',async (req,res)=>{
    const result=await Customer.find().sort('name');
    res.send(result);
});

router.post('/',async (req,res)=>{
    const{validatecustomer} =Customer.validate(req.body);
    if(validatecustomer) return res.status(400).send(validatecustomer.details[0].message);

    let customer=new Customer({
        name:req.body.name,
        phone:req.body.phone
    });

    const result = await customer.save();
    res.send(result);
});

router.put('/:id',async (req,res)=>{
    const {validatecustomer}=validate(req.body);
    if(validatecustomer) return res.status(400).send(validatecustomer.details[0].message);

    let customer=await Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        phone:req.body.phone
    },{new:true});
    if(!customer) return res.status(404).send('Invalid customer Id');

    const result=await customer.save();
    res.send(result);
});

router.delete('/:id',async (req,res)=>{
    const result=await Customer.findByIdAndDelete(req.params.id);
    if(!result) return res.status(400).send('Invalid customer Id');
    res.send(result);
});

router.get('/:id',async (req,res)=>{
    const result=await  Customer.findById(req.params.id);
    if(!result) return res.status(400).send('Invalid customer Id');

    res.send(result);
})

module.exports=router;