const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

mongoose.model('Person', personSchema);
