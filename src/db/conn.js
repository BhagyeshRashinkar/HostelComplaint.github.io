const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/complaintRegistration').then(function(){
    console.log('connection established');
}).catch(function(err){
    console.log(err);
})