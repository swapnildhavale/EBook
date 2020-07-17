const mongoose=require('mongoose');
const winston=require('winston');

module.exports=function(){
    /*
    mongoose.connect('mongodb://localhost/AudioBook', { useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex: true})
    .then(console.log('Successfully connected to MongoDB.!'))
    .catch(err => console.log('Something went wrong cant connect to MongoDb.!'));
    */
   mongoose.connect('mongodb://localhost/AudioBook', { useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex: true})
    .then(winston.info('Successfully connected to MongoDB.!'));
        
}