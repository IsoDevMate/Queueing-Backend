
const { createTicket,} = require('./RegisterController');

const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket=> {
    // either with send()
    socket.send('Hello!');
   
    // handle the event sent with socket.send()
    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    });
 // client.on('event', data => { /* … */ });
  // client.on('disconnect', () => { /* … */ });



  //we only need the ticket id,ticket no  and the service name
const tickets= createTicket();

socket.emit('ticket-created',  { ticket_no: tickets.ticket_no });
socket.emit('ticket-status', { ticket_status: tickets.ticket_status });
socket.emit('ticket-service',  { service: tickets.service });

});
server.listen(4040);

