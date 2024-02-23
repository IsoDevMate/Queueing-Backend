const mongoose = require('mongoose');
const Service = require('./models/serviceschema'); // Import your service schema

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
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
            // Check if the service already exists in the database
            const existingService = await Service.findOne({ service_id: service.service_id });

            // If the service does not exist, create it
            if (!existingService) {
                await Service.create(service);
                console.log(`Service ${service.service_id} has been created.`);
            } else {
                console.log(`Service ${service.service_id} already exists.`);
            }
        }
        console.log('Services have been populated in the database.');
    } catch (err) {
        console.error("An error occurred while connecting to the DB:", err.message);
    }
};

module.exports = connectDB;
