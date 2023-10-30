
const Ticket = require('../models/ticketschema');
const bcrypt = require('bcrypt');
const User =require('../models/schema');
exports.createUser = async (req, res,next) => {
    try {
        const service = req.body.service;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send('User already exists...');
            return null; // Return null to indicate an error
        }

        user = new User({
            service:service,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.email = await bcrypt.hash(user.email, salt);

        user = await user.save();
        next();
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on user creation ');
        return null; // Return null to indicate an error
    }
};

const Service = require('../models/serviceschema');

exports.createTicket = async (req, res) => {
    try {
        const serviceName = req.body.service;
        const userId = req.body.id;
        console.log("user id:",userId);
        console.log("service name:",serviceName);
        // Check if the user has an active ticket for the same service
        const existingTicket = await Ticket.findOne({
            user_id: userId,
            service_id: { $ne: null }, // Check for an assigned service ID
            ticket_status: { $ne: 'completed' }
        });
        console.log("ticket content:", existingTicket);

        if (existingTicket) {
            // Check if the existing ticket is for the same service
            const existingService = await Service.findById(existingTicket.service_id);
            if (existingService.name === serviceName) {
                res.status(400).send('User already has an active ticket for the same service');
                return null;
            }
        }

        // Find the selected service
        const selectedService = await Service.findOne({ name: serviceName });
        console.log("selected service:", selectedService);
        if (!selectedService) {
            res.status(400).send('Service not found');
            return null;
        }

        // Create a new ticket
        const ticket = new Ticket({
            user_id: userId,
            service_id: selectedService._id, // Use the ID of the selected service
            ticket_status: req.body.ticket_status
        });

        await ticket.save();
        return ticket;

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on ticket creation');
        return null;
    }
};


