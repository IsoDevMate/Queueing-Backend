const mongoose = require('mongoose');
const Service = require('./models/serviceschema'); // Import your service schema

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            writeConcern: { w: 'majority' }
        });
        console.log("Connected to DB");

        // Add the code to populate services in the database
        const services = [
            {
                service_id: '11',
                name: 'Servicing',
                price: 300,
                description: 'check engine',
                waiting_time: 21
            },
            {
                service_id: '20',
                name: 'Brake-System-Inspetion',
                price: 400,
                description: 'check brake system',
                waiting_time: 7
            },
            {
                service_id: '33',
                name: 'Tire-Service',
                price: 250,
                description: 'change tire',
                waiting_time: 6
            },
            {
                service_id: '44',
                name: 'Battery-Service',
                price: 280,
                description: 'change battery',
                waiting_time: 8
            }
        ];

        for (const service of services) {
            await Service.create(service);
        }
        console.log('Services have been populated in the database.');
    } catch (err) {
        console.error("An error occurred while connecting to the DB:", err.message);
    }
};

module.exports = connectDB;
