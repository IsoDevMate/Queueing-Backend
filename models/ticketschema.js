const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    ticket_status: {
        type: String,
        required: true
    },
    ticket_no: {
        type: String,
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', // Reference to the Service model
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
