const Service = require('../models/serviceschema');
const Ticket = require('../models/ticketschema');
const bcrypt = require('bcrypt');
const User =require('../models/schema');
const axios = require('axios');



//require("dotenv").config()
//const locationId = process.env["SQUARE_LOCATION_ID"];

const {
    bookingsApi,
    customersApi,
    ApiError
  } = require("./squarelogic/squareclient");

  const { v4: uuidv4 } = require("uuid");

  
  //const env = process.env["ENVIRONMENT"].toLowerCase();
  //const accessToken = process.env["SQUARE_ACCESS_TOKEN"];

exports.createUser = async (req, res,next) => {
    try {
        const service = req.body.service;
        let user = await User.findOne({ phone: req.body.phoneNumber});
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
     
        try {
            const response = await customersApi.createCustomer({
              idempotencyKey:  uuidv4(),
              givenName:user.name,
              familyName: 'ouma',
              emailAddress: user.email,
              phoneNumber: user.phoneNumber,
              referenceId: 'YOUR_REFERENCE_ID',
              note: 'a customer'
            });

            
            onsole.log("Customer creation response:", response);
            console.log(response.result);
            return customer.id;
          } catch(error) {
            console.log(error.message);
          }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.email = await bcrypt.hash(user.email, salt);
       // user.phoneNumber = await bcrypt.hash(user.phoneNumber, salt);
        console.log("user:",user);
        user = await user.save();
        req.user = user; // Attach the user document to the request object
        next();
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on user creation ');
        return null; // Return null to indicate an error
    }
   
};

//const Service = require('../models/serviceschema');

exports.createTicket = async (req, res) => {
    try {
        const serviceName = req.body.service;
       // const service_id = req.body.service_id;
        const userId = req.user._id; // Get the user ID from the user document attached to the request object
        console.log("user id:",userId);
        console.log("service name:",serviceName);
        //console.log("service id:",service_id);
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
         //icket_no, user_id, and ticket_status
        // Create a new ticket
        const ticket = new Ticket({
            user_id: userId,
            ticket_no: Math.floor(Math.random() * 1000000).toString(), // Generate a random ticket number
            service_id: selectedService._id, // Use the ID of the selected service
            ticket_status: req.body.ticket_status
        });
         
try{
    const response = await bookingsApi.createBooking({
        idempotencyKey: uuidv4(),
        booking: {
            startAt: ticket.createdAt,
            customerId:userId ,
            customerNote: "Customer's note",
            sellerNote: 'Complementary VIP service',
            phoneNumber: req.user.phoneNumber,
            appointmentSegments: [
              {
                durationMinutes: 60,
                serviceVariationId: 'GUN7HNQBH7ZRARYZN52E7O4B',
                teamMemberId: '2_uNFkqPYqV-AZB-7neN',
                serviceVariationVersion: 1604352990016
              }
            ],
          }
    });
    
    console.log(response.result);
} catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log("error caught",e.category);
        console.log("error to  caught",e.code);
        console.log("error caught here",e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
  
        console.log("ticket payload:", ticket);
        await ticket.save();
        console.log("ticket saved! Here is you ticket", ticket);
        return ticket;

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on ticket creation');
        return null;
    }
};


exports.callback=async(req,res)=>{
   // const callbackurl=process.env.CALLBACK_URL;
   const callbackurl="https://c959-41-212-65-143.ngrok-free.app"
   try {
    const response = await client.bookingsApi.createBooking({
      idempotencyKey: 'a30ae72e-f9ed-4f71-a380-a189387e2bbd',
      booking: {}
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }


    const response=await axios.post(callbackurl,{
        "phoneNumber":req.body.phoneNumber,
        "service":req.body.service,
        "ticket_status":req.body.ticket_status
        
    })
    res.send("success")
    console.log("response:",response.data)
}