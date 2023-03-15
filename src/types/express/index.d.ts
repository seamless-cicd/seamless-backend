import { Octokit } from '@octokit/core';
import Redis from 'ioredis';

declare global {
  declare namespace Express {
    interface Request {
      redisClient: Redis;
      octokit: Octokit;
    }
  }
}
