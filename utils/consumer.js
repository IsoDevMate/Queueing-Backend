//First, define the Redis configuration

const defaultRedisConfig = {
  redis: {
    host: redisHost,
    port: redisPort,
    db: redisDatabaseNumber,
  },
};
//Consumer logic

// Redis server Configuration 
const queue = new Bull( defaultRedisConfig);
//setQueues([
 // new BullAdapter(queue),
 // ...
//]);
// Consumer processing logic
//queue.process(async (job) => {