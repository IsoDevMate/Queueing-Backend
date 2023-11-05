const express = require('express');
const Queue = require('bull');
//const QueueMQ = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
//const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOptions = {
    redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
    };

//create a new queue with redis 
const queueList=["ticket"]
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const queues= queueList.
map(queueName =>  new Queue(queueName, redisOptions))
.map(queue => new BullAdapter(queue));

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues,
  serverAdapter: serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'My BOARD',
      boardLogo: {
        width: '50px',
        height: 100,
      },
   
    },
  },

});

const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server

app.listen(3000, () => {
  console.log('Running on 3000...');
  console.log('For the UI, open http://localhost:3000/admin/queues');
  console.log('Make sure Redis is running on port 6379 by default');
});