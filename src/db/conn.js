const mongoose = require('mongoose');

const DB = "mongodb+srv://Bhagyesh:UmgvYFutDY5FPwYj@cluster0.kb4wjcw.mongodb.net/complaintregistration?retryWrites=true&w=majority"

mongoose.connect(DB).then(function(){
    console.log('connection established');
}).catch(function(err){
    console.log('no connection');
})