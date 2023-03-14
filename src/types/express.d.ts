import { Octokit } from '@octokit/rest';
import Redis from 'ioredis';

declare global {
  namespace Express {
    interface Request {
      redisClient: Redis;
      octokit: Octokit;
    }
  }
}
