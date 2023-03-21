import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './config';

const redisClient = new Redis(REDIS_PORT || 6379, REDIS_HOST);

// Status messages
redisClient
  .on('connect', () => {
    console.log('Connecting to Redis');
  })
  .on('ready', () => {
    console.log('Successfully connected to Redis');
  })
  .on('reconnecting', () => {
    console.log('Reconnecting to Redis');
  })
  .on('error', (err) => {
    console.log('Error', err);
    redisClient.quit();
  })
  .on('close', () => {
    console.log('Closing connection to Redis');
    redisClient.quit();
  });

export { redisClient };
