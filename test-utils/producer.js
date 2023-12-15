// SIMPLE QUEUE

const Bull = require("bull");
//const dotenv = require("dotenv");
require('dotenv').config()


//dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
  limit:{
    max:100,
    duration:1000
  }
};
console.log(process.env.REDIS_PORT);
// DEFINE QUEUE
const ticketQueue = new Bull("ticket", redisOptions);

// REGISTER PROCESSER
ticketQueue.process(async(payload, done) => {
  console.log("Preparing the queue...");
    //step 2
  
    payload.progress(10)
    payload.log( "Burger not quite!")
    await payload.save();

    //step 3
    payload.progress(20)
    payload.log( "Burger almost done!")
    await payload.save();

    done();
  }, 4041)
    .catch((err) => {
        console.log("Error processing the queue:", err);
    });

//ADD morejobs to the queue 

const jobs=[...new Array[10]].map((_)=>({
    bun: "🍔",
    cheese: "🧀",
    toppings: ["🍅", "🫒", "🥒", "🌶️"],

    }))
    jobs.forEach((job) => ticketQueue.add(job,{attempts:3}))
    
// PROCESS THE QUEUE
ticketQueue.on("completed", (job, result) => {
  console.log('completed with result:', `${job.id}`  ,result);
});
