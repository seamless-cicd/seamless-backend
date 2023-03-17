import { createOAuthUserAuth } from '@octokit/auth-oauth-user';
import { Octokit } from '@octokit/core';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../utils/config';

const getCommit = async (
  token: string,
  owner: string,
  repo: string,
  commitHash: string,
) => {
  try {
    if (!token) {
      throw new Error('Authentication error');
    }

    const octokit = new Octokit({
      authStrategy: createOAuthUserAuth,
      auth: {
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        clientType: 'oauth-app',
        token,
        scopes: ['repo', 'write:repo_hook'],
      },
    });

    const commit = await octokit.request(
      'GET /repos/{owner}/{repo}/git/commits/{commit_sha}',
      {
        owner,
        repo,
        commit_sha: commitHash,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    return commit;
  } catch (error) {
    console.error(error);
  }
};

export default { getCommit };
