const express=require('express');
const genre = require('../routes/genre');
const book = require('../routes/book');
const customer = require('../routes/customer');
const rental = require('../routes/rental');
const user = require('../routes/user');
const auth= require('../routes/auth');

module.exports=function(app){
    app.use(express.json());
app.use('/api/genres', genre);
app.use('/api/books', book);
app.use('/api/customers', customer);
app.use('/api/rentals', rental);
app.use('/api/users',user);
app.use('/api/auth',auth);
}