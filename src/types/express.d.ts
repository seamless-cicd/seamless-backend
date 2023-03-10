import Redis from 'ioredis';

declare global {
  namespace Express {
    interface Request {
      redisClient: Redis;
    }
  }
}
