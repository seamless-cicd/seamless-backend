import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './config';

const redisClient = new Redis(REDIS_PORT || 6379, REDIS_HOST);

// Status messages
redisClient
  .on('connect', () => {
    console.log('Connecting');
  })
  .on('ready', () => {
    console.log('Successfully connected');
  })
  .on('reconnecting', () => {
    console.log('Reconnecting');
  })
  .on('error', (err) => {
    console.log('Error', err);
    redisClient.quit();
  })
  .on('close', () => {
    console.log('Closing connection');
    redisClient.quit();
  });

export { redisClient };
