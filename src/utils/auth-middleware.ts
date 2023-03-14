import { createOAuthUserAuth } from '@octokit/auth-oauth-user';
import { Octokit } from '@octokit/rest';
import { NextFunction, Request, Response } from 'express';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../utils/config';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Authenticate with Octokit before proceeding
    const token = req.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Authentication error');
    }

    const octokit = new Octokit({
      authStrategy: createOAuthUserAuth,
      auth: {
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        clientType: 'oauth-app',
        token,
      },
    });

    // Try to make a request; will fail if user is unauthenticated
    await octokit.request('GET /user');

    req.octokit = octokit;

    next();
  } catch (error) {
    return res.status(401).send('Authentication error');
  }
};
