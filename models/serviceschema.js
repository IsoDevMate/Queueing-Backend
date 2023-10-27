const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
/*    service_id: {
        type: String,
        required: true,
        unique: true
    }, */
    
    description: {
        type: String,
        maxlength: 255
    },
    waiting_time: {
        type: Number,
        required: true,
        min: 0
    }
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
