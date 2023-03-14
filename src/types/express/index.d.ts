import { Octokit } from '@octokit/rest';
import Redis from 'ioredis';

declare global {
  declare namespace Express {
    interface Request {
      redisClient: Redis;
      octokit: Octokit & {
        paginate: PaginateInterface;
      } & RestEndpointMethods &
        Api;
    }
  }
}
