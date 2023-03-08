import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '../utils/config';

const redisClient = new Redis(REDIS_PORT, REDIS_HOST, {
  connectTimeout: 2000,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
  reconnectOnError: (err) => err.message.includes('READONLY'),
  retryStrategy: (times: number) => 2000,
});

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
    redisClient.disconnect();
  })
  .on('close', () => {
    console.log('Closing connection');
    redisClient.disconnect();
  });

export { redisClient };
