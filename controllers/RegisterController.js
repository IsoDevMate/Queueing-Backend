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

// Assuming these are the necessary imports, adjust them based on your project structure




exports.createUser = async (req, res, next) => {
    try {
        const service = req.body.service;
        let user = await User.findOne({ phone: req.body.phoneNumber });

        if (user) {
            res.status(400).send('User already exists...');
            return null; // Return null to indicate an error
        }

        user = new User({
            service: service,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        });

        try {
            const response = await customersApi.createCustomer({
                idempotencyKey: uuidv4(),
                givenName: user.name,
                familyName: 'ouma',
                emailAddress: user.email,
                phoneNumber: user.phoneNumber,
                referenceId: 'YOUR_REFERENCE_ID',
                note: 'a customer'
            });

            console.log("Customer creation response:", response);
            console.log(response.result);
            return response.result.customer.id; // Correct the return statement
        } catch (error) {
            console.log(error.message);
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.email = await bcrypt.hash(user.email, salt);

        user = await user.save();
        req.user = user;
        next();
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on user creation');
        return null;
    }
};

exports.createTicket = async (req, res, next) => {
  try {
      const serviceName = req.body.service;
      const userId = req.user._id;

      const existingTicket = await Ticket.findOne({
          user_id: userId,
          service_id: { $ne: null },
          ticket_status: { $ne: 'completed' }
      });

      if (existingTicket) {
          const existingService = await Service.findById(existingTicket.service_id);
          if (existingService.name === serviceName) {
              res.status(400).send('User already has an active ticket for the same service');
              return null;
          }
      }

      const selectedService = await Service.findOne({ name: serviceName });
      if (!selectedService) {
          res.status(400).send('Service not found');
          return null;
      }

      let ticket;

      try {
          // Create a new ticket
          ticket = new Ticket({
              user_id: userId,
              ticket_no: Math.floor(Math.random() * 1000000).toString(),
              service_id: selectedService._id,
              ticket_status: req.body.ticket_status
          });

          // Set the 'createdAt' property before making the booking request
          ticket.createdAt = new Date(); // Replace this with the actual creation date

          const response = await bookingsApi.createBooking({
              idempotencyKey: uuidv4(),
              booking: {
                  startAt: ticket.createdAt,
                  customerId: userId,
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

          console.log("ticket payload:", ticket);
          await ticket.save();
          console.log("ticket saved! Here is your ticket", ticket);

          return ticket;

      } catch (error) {
          if (error instanceof ApiError) {
              error.result.errors.forEach(function (e) {
                  console.log("error caught", e.category);
                  console.log("error to caught", e.code);
                  console.log("error caught here", e.detail);
              });
          } else {
              console.log("Unexpected error occurred: ", error);
          }

          // Ensure the response is sent only once
          return null;
      }

  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error on ticket creation');
      // Ensure the response is sent only once
      return null;
  }
};




exports.callback=async(req,res)=>{
   // const callbackurl=process.env.CALLBACK_URL;
   const callbackurl="https://1087-41-212-65-143.ngrok-free.app"
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