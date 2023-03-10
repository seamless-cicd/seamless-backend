import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './config';

const redisClient = new Redis(REDIS_PORT, REDIS_HOST, {
  connectTimeout: 2000,
  lazyConnect: true,
  reconnectOnError: (err) => err.message.includes('READONLY'),
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

// Attach Redis client to the request and call the next middleware
export const redisMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //@ts-ignore
    req.redisClient = redisClient;
    await next();
  } catch (error) {
    console.error('Redis middleware error', error);
    res.status(500).send('Internal server error');
  }
};
