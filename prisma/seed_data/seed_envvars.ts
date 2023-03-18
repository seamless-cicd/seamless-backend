import dotenv from 'dotenv';
dotenv.config();

import { ResourceType } from '@prisma/client';
import prisma from '../../src/utils/prisma-client';

import { AWS_ACCOUNT_ID } from '../../src/utils/config';

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
        name: 'awsAccountId',
        value: AWS_ACCOUNT_ID,
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsEcsCluster',
        value:
          'SeamlessStack-SeamlessDemoProdClusterStackNestedStackSeamlessDemoProdClusterStackNeste-UZBAFPU59B8U-SeamlessDemoProdCluster5D82937D-kGDRcx5wgR62',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsEcsClusterStaging',
        value:
          'SeamlessStack-SeamlessDemoProdClusterStackNestedStackSeamlessDemoProdClusterStackNeste-UZBAFPU59B8U-SeamlessDemoProdCluster5D82937D-kGDRcx5wgR62',
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
        value:
          'SeamlessStack-SeamlessDemoProdStackNestedStackSeamlessDemoProdStackNestedStackResource-KII6J4RJ34EG-SeamlessDemoProdNotificationServiceB2D131F4-Q4Nyej21pXj3',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsServiceStaging',
        value:
          'SeamlessStack-SeamlessDemoProdStackNestedStackSeamlessDemoProdStackNestedStackResource-KII6J4RJ34EG-SeamlessDemoProdNotificationServiceB2D131F4-Q4Nyej21pXj3',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcrRepo',
        value: 'seamless-demo-prod-notification',
      },
    ].map((envVarData) => ({
      ...envVarData,
      resourceId: serviceId,
    })),
  });
  const allEnvVars = await prisma.environmentVariable.findMany();
  return allEnvVars;
};
