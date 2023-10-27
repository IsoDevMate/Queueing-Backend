const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const AfricasTalking = require('africastalking')({
    apiKey: process.env.API_KEY,
    username: process.env.USERNAME
});

const sms = AfricasTalking.SMS;

const connectDB = require('./db');

app.use(cors());
app.use(bodyParser.json());

app.post('/sms', async (req, res) => {
    console.log(req.body);
    const {phoneNumber} = req.body;

    console.log(phoneNumber);
    const options = {
        to: [`+254${phoneNumber}`],
        message: 'Hello world',
        from: '',
    }
    try {
        await sms.send(options)
    res.status(200).send({ message: 'Message sent successfully.' })
    } catch (error) {
        console.error(err)
        console.log("Could not send SMS:", error.message);
    }
})