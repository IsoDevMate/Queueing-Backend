const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose=require('mongoose')
const connectDB=require('./db')
const port = process.env.PORT || 5050;
const bodyParser = require("body-parser");
const  regticket = require("./routes/routers");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("Welcome to our bukit backend API")
 })
 


// connect Database
connectDB(); 

// apis
app.use('/api', regticket)


// test db connection
mongoose.connection.once('open',()=>{
  console.log(`Connected Successfully to the Database: ${mongoose.connection.name}`)
  app.listen(port, () => {
    console.log(`app is running at localhost:${port}`);
  });
  })

