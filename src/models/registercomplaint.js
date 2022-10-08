const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintnumber: {
        type: Number,
        required: true,
        unique: true
    },

    studentroll: {
        type: String,
        required: true
    },

    studentname: {
        type: String,
        required: true
    },

    studentcontact: {
        type: Number,
        required: true
    },

    hostelblock: {
        type: String,
        required: true
    },

    hostelroom: {
        type: Number,
        required: true
    },

    complainttype: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    complaintstatus:{
        type: String,
        default: 'unresolved',
        required: true
    }
})

const Register = new mongoose.model("Registeredcomplaint", complaintSchema);

module.exports = Register;