
   // Processing logic
const  User = require("../models/schema");
const Ticket = require("../models/ticketschema");
const { createTicket } = require("../controllers/RegisterController");
//const { setQueues, BullAdapter } = require("bull-board");
   const Queue = require("bull");
   const milliseconds = require("milliseconds");
const { createTicket } = require("../controllers/RegisterController");
const defaultRedisConfig = require("./redis");

const queue = new Queue("myQueue", {
    redis: {
        defaultRedisConfig
    },
  });
const {email}=req.body;
const usersinqueue= await User.find({
    email: email,
});    
if (!usersinqueue) {
    return res.status(400).send("User already in queue...");
}

try{
const controller = async (next) => {
  // Process At: 2021-01-22T10:04:00.000Z
  const currentTime = new Date().getTime();
  const processAt = new Date("2021-01-22T10:04:00.000Z").getTime();
  const delay = processAt - currentTime;
  await queue.add(
    {
      email: usersinqueue.email,
      subject: "Event Reminder",
      body: "You have an event coming up!",
    },
    { delay }
  );
  const job = await queue.add(userinsqueue);
  res.json({ id: job.id });
  return queue;
};
next();
void controller();

}
catch(error){
    console.log(error.message);
}
const  {ticket_no,ticket_status,service}=createTicket
const ticketinqueue= await Ticket.find({
    ticket_no: ticket_no,
    ticket_status: ticket_status,
    service: service,
});
if (ticketinqueue.ticket_no===ticket_no) {
    return res.status(400).send("Ticket already in queue...");
}
try{
const controllers = async () => {
    const queuedJobs = await queue.getJobs(["waiting", "delayed"]);
  
    const jobsToRemove = queuedJobs.filter(
      (queuedJob) => queuedJob.data.ticket_status === "completed"
    );
  
    await Promise.all(jobsToRemove.map((job) => job.remove()));
  };
  
  void controllers();
}
catch(error){
    console.log("job removal error",error.message);
}