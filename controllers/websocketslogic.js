
const { createTicket,} = require('./RegisterController');

  //we only need the ticket id,ticket no  and the service name
// Replace with the actual service name seleted by the user from the frontend
const service =`${req.body.service}`;
const tickets = createTicket(null, null, null, service);



const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket=> {
   
    // handle the event sent with socket.send()
    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    });

  socket.send('Hello!');



// Emit 'ticket_booked' event

io.emit('ticket-created',  { ticket_no: tickets.ticket_no });
io.emit('ticket-status', { ticket_status: tickets.ticket_status });
io.emit('ticket-service',  { service: tickets.service });
 // Emit 'ticket_status_changed' event
//    io.emit('ticket_status_changed', { ticketId: existingTicket._id, status: existingTicket.ticket_status });
});

server.listen(4040);

