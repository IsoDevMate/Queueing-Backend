//create a function that handles the ticket logic 
//and updates the ticket status in the database also returns ticket object if successful
//fuction should claculate the estimated waiting time for the ticket
//tkwaitime=number of tickets in queue * average time to serve a ticket
const TicketSchema = require('../models/ticketschema');
exports.Tklogic = async (req, res, next) => {
    try {
        const ticket_no = req.params.ticket_no; // Assuming you pass the ticket number in the request parameters

        const handleTicket = async (ticket_no) => {
            try {
                // Get ticket from the database
                const ticket = await TicketSchema.findById(ticket_no);

                if (!ticket) {
                    res.status(404).send('Ticket not found');
                    return;
                }

                // Calculate estimated wait time
                const queueLength = await TicketSchema.countDocuments({ status: 'queued' });
                const avgServiceTime = 5; // minutes
                const waitTime = queueLength * avgServiceTime;

                // Update ticket status to 'in progress' and save to the database
                ticket.status = 'queued';
                await ticket.save();

                // Return updated ticket with wait time
                res.status(200).json({ ticket: { ...ticket.toObject() }, waitTime });
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }

        await handleTicket(ticket_no);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Example usage:

//const ticket = await handleTicket('1234');
//console.log(ticket.waitTime); // prints estimated wait time

