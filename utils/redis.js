const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisDatabaseNumber = process.env.REDIS_DB || 0;

export const defaultRedisConfig = {
    redis: {
      host: redisHost,
      port: redisPort,
      db: redisDatabaseNumber,
    },
  };