const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        default: 0
    },
    complement: {
        type: String
    },
    district: {
        type: String
    },
    city: {
        type: String
    },
    uf: {
        type: String,
        maxlength: 2
    }
});

mongoose.model('Address', addressSchema);
