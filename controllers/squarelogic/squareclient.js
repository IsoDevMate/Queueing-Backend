require('dotenv').config();


const { Client, ApiError } = require('square');


console.log(ApiError);
const env = process.env.ENVIRONMENT || "sandbox";
const accessToken = process.env.SQUARE_ACCESS_TOKEN

// Set Square credentials
const config = {
  accessToken,
  environment: env === "sandbox" 
};

// Extract instances of Api that are used
// You can add additional APIs here if you so choose
const {
  bookingsApi,
  customersApi,
  catalogApi,
  locationsApi,
  teamApi
} = new Client(config);

module.exports = {
  bookingsApi,
  customersApi,
  catalogApi,
  locationsApi,
  teamApi,
  ApiError
};

