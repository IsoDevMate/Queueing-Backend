
const { createTicket,} = require('./RegisterController');

const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket=> {
   
    // handle the event sent with socket.send()
    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    });

  socket.send('Hello!');

  //we only need the ticket id,ticket no  and the service name
const tickets= createTicket();


// Emit 'ticket_booked' event

io.emit('ticket-created',  { ticket_no: tickets.ticket_no });
io.emit('ticket-status', { ticket_status: tickets.ticket_status });
io.emit('ticket-service',  { service: tickets.service });
 // Emit 'ticket_status_changed' event
//    io.emit('ticket_status_changed', { ticketId: existingTicket._id, status: existingTicket.ticket_status });
});
server.listen(4040);

