import { createOAuthUserAuth } from '@octokit/auth-oauth-user';
import { Octokit } from '@octokit/core';
import { TriggerType } from '@prisma/client';
import {
  MainWebhook,
  MainWebhookSchema,
  Webhook,
} from '../schemas/webhook-schema';
import pipelinesService from '../services/pipelines';
import prisma from '../utils/prisma-client';

// Store GitHub OAuth token in pipeline entity
const storeToken = async (githubOauthToken: string, pipelineId: string) => {
  try {
    const updatedPipeline = await prisma.pipeline.update({
      where: {
        id: pipelineId,
      },
      data: {
        githubOauthToken,
      },
    });
    await prisma.$disconnect();
    return updatedPipeline.githubOauthToken;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
};

// Retrieve GitHub OAuth token for pipeline
const getToken = async (pipelineId: string) => {
  try {
    const githubOauthToken = await prisma.pipeline.findUnique({
      where: {
        id: pipelineId,
      },
      select: {
        githubOauthToken: true,
      },
    });
    await prisma.$disconnect();
    return githubOauthToken?.githubOauthToken;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
};

// Retrieve commit details
const getCommit = async (owner: string, repo: string, commit_sha: string) => {
  try {
    // Retrieve GitHub OAuth Token for first (only) pipeline
    const pipeline = await pipelinesService.getFirst();
    if (!pipeline) throw new Error('no pipeline found');

    const token = await getToken(pipeline.id);
    if (!token) throw new Error('authentication error');

    const octokit = new Octokit({
      authStrategy: createOAuthUserAuth,
      auth: {
        token,
      },
    });

    const commit = await octokit.request(
      'GET /repos/{owner}/{repo}/git/commits/{commit_sha}',
      {
        owner,
        repo,
        commit_sha,
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

// Identify webhook type, retrieve commit details, return payload for creatng a Run
const isMainWebhook = (webhook: unknown): webhook is MainWebhook =>
  MainWebhookSchema.safeParse(webhook).success;

const processWebhook = async (webhook: Webhook) => {
  // Push to Main
  if (isMainWebhook(webhook)) {
    // Destructure properties out of nested object
    const {
      repository: { html_url },
      head_commit: {
        id: commitHash,
        message: commitMessage,
        author: { name: committer },
      },
    } = webhook;

    return {
      commitHash,
      commitMessage,
      committer,
      triggerType: TriggerType.MAIN,
      githubRepoUrl: html_url.split('/commit/')[0],
    };
  }

  // Pull request
  const {
    pull_request: {
      head: {
        repo: {
          owner: { login: owner },
          name: repo,
        },
        sha,
      },
    },
  } = webhook;

  // Retrieve full commit data
  const fullCommitData = await getCommit(owner, repo, sha);
  if (!fullCommitData) {
    throw new Error('commit not found');
  }

  const {
    data: {
      message: commitMessage,
      author: { name: committer },
      html_url,
    },
  } = fullCommitData;

  return {
    commitHash: sha,
    commitMessage,
    committer,
    triggerType:
      webhook.action === 'opened' ? TriggerType.PR_OPEN : TriggerType.PR_SYNC,
    githubRepoUrl: html_url.split('/commit/')[0],
  };
};

export default { storeToken, getToken, processWebhook, getCommit };
