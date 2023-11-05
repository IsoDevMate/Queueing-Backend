
const { createTicket,} = require('./RegisterController');

const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket=> {
   
    // handle the event sent with socket.send()
    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    });
 // client.on('event', data => { /* … */ });
  // client.on('disconnect', () => { /* … */ });

  socket.send('Hello!');

  //we only need the ticket id,ticket no  and the service name
const tickets= createTicket();

io.emit('ticket-created',  { ticket_no: tickets.ticket_no });
io.emit('ticket-status', { ticket_status: tickets.ticket_status });
io.emit('ticket-service',  { service: tickets.service });

});
server.listen(4040);

