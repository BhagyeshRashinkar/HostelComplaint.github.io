const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.URL;

mongoose.connect(url).then(function(){
    console.log('connection established');
}).catch(function(err){
    console.log('no connection');
})