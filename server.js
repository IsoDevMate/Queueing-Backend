const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose=require('mongoose')
const connectDB=require('./db')
const port = process.env.PORT || 5050;
const bodyParser = require("body-parser");
const  regticket = require("./routes/routers");
const squareroutes = require("./Controllers/squarelogic/customer.js");

// Check that all required .env variables exist
if (!process.env["ENVIRONMENT"]) {
  console.error(".env file missing required field \"ENVIRONMENT\".");
  process.exit(1);
} else if (!process.env["SQUARE_ACCESS_TOKEN"]) {
  console.error(".env file missing required field \"SQUARE_ACCESS_TOKEN\".");
  process.exit(1);
} else if (!process.env["SQUARE_LOCATION_ID"]) {
  console.error(".env file missing required field \"SQUARE_LOCATION_ID\".");
  process.exit(1);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

 //Entry point for the app. Will redirect to the /services endpoint.
 
app.get("/", async (req, res, next) => {
 // res.send("Welcome to our bukit backend API")
  res.redirect("/services");
});

// connect Database
connectDB(); 

// apis
app.use('/api', regticket)
app.use('/api/v1', squareroutes)


// test db connection
mongoose.connection.once('open',()=>{
  console.log(`Connected Successfully to the Database: ${mongoose.connection.name}`)
  app.listen(port, () => {
    console.log(`app is running at localhost:${port}`);
  });
  })

