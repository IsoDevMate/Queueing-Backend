//create a function that handles the ticket logic 
//and updates the ticket status in the database also returns ticket object if successful
//fuction should claculate the estimated waiting time for the ticket
//tkwaitime=number of tickets in queue * average time to serve a ticket
const TicketSchema = require('../models/ticketschema');
exports.Tklogic=async(req,res,next)=>{
const  handleTicket=async(ticket_no)=> {

  // Get ticket from database
  const ticket = await db.tickets.findById(ticket_no);

  // Calculate estimated wait time
  const queueLength = await db.tickets.countDocuments({status: 'queued'});
  const avgServiceTime = 5; // minutes
  const waitTime = queueLength * avgServiceTime;

  // Update ticket status to 'in progress' and save to db
  ticket.status = 'in progress';
  await ticket.save();
  next();
  // Return updated ticket with wait time
  //res.status(200).json({ ticket, waitTime})
  return {
    ...ticket.toObject(),
    waitTime 
  };
  
}

console.log(handleTicket())
}
// Example usage:

//const ticket = await handleTicket('1234');
//console.log(ticket.waitTime); // prints estimated wait time

module.exports = handleTicket;