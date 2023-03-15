import dotenv from 'dotenv';
dotenv.config();

import { StageType, TriggerType } from '@prisma/client';
import prisma from '../../src/utils/prisma-client';

import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  GITHUB_PAT,
} from '../../src/utils/config';

export const seedPipelines = async () => {
  await prisma.pipeline.create({
    data: {
      id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
      name: 'Demo Pipeline',
      // githubClientId: GITHUB_CLIENT_ID,
      // githubClientSecret: GITHUB_CLIENT_SECRET,
      githubPat: GITHUB_PAT,
      awsAccessKey: AWS_ACCESS_KEY,
      awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
      services: {
        create: [
          {
            id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e2',
            name: 'Demo Service',
            triggerOnMain: true,
            triggerOnPrOpen: false,
            triggerOnPrSync: false,
            useStaging: false,
            autoDeploy: false,
            githubRepoUrl:
              'https://github.com/seamless-cicd/seamless-demo-notification',
            unitTestCommand: 'npm run test',
            codeQualityCommand: 'npm run lint',
            dockerfilePath: '.',
            runs: {
              create: [
                {
                  id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e3',
                  commitHash: 'abc123',
                  commitMessage: 'feat: add notification feature',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.MAIN,
                  stages: {
                    create: [
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e4',
                        type: StageType.PREPARE,
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e5',
                        type: StageType.CODE_QUALITY,
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e6',
                        type: StageType.UNIT_TEST,
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e7',
                        type: StageType.BUILD,
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e8',
                        type: StageType.DEPLOY_STAGING,
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e9',
                        type: StageType.DEPLOY_PROD,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const allPipelines = await prisma.pipeline.findMany();
  return allPipelines;
};
