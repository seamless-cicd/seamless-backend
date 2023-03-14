import dotenv from 'dotenv';
dotenv.config();

import { ResourceType } from '@prisma/client';
import prisma from '../../src/clients/prisma-client';

export const seedPipelineEnvironmentVariables = async (pipelineId: string) => {
  await prisma.environmentVariable.createMany({
    data: [
      {
        resourceType: ResourceType.PIPELINE,
        resourceId: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
        name: 'awsRegion',
        value: 'us-east-1',
      },
      {
        resourceType: ResourceType.PIPELINE,
        resourceId: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
        name: 'awsAvailabilityZone',
        value: 'us-east-1a',
      },
      {
        resourceType: ResourceType.PIPELINE,
        resourceId: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
        name: 'awsAccountId',
        value: process.env.AWS_ACCOUNT_ID || '',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsEcsCluster',
        value: 'demo-cluster',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsEcsClusterStaging',
        value: 'demo-cluster',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsStepFunction',
        value: process.env.AWS_STEP_FUNCTION_ARN || '',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsRds',
        value: process.env.DATABASE_URL || '',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsElastiCache',
        value: process.env.REDIS_HOST || '',
      },
    ].map((envVarData) => ({
      ...envVarData,
      resourceId: pipelineId,
    })),
  });
  const allEnvVars = await prisma.environmentVariable.findMany();
  return allEnvVars;
};

export const seedServiceEnvironmentVariables = async (serviceId: string) => {
  await prisma.environmentVariable.createMany({
    data: [
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsService',
        value: 'seamless-demo-notification',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsServiceStaging',
        value: 'seamless-demo-notification',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsTaskDefinition',
        value: 'seamless-demo-notification',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcrRepository',
        value: 'seamless-demo-notification',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsSnsTopic',
        value: 'seamless-pipeline-topic',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'dockerBaseImage',
        value: 'node',
      },
    ].map((envVarData) => ({
      ...envVarData,
      resourceId: serviceId,
    })),
  });
  const allEnvVars = await prisma.environmentVariable.findMany();
  return allEnvVars;
};
