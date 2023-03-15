import { EnvironmentVariable, ResourceType, Service } from '@prisma/client';
import ecsService from '../utils/aws-sdk/ecs';
import prisma from '../utils/prisma-client';
import envVarsService from './envVars';
import pipelinesService from './pipelines';

export interface ServiceWithEnvVars extends Service {
  awsEcsServiceStaging?: string;
  awsEcsService: string;
  awsEcrRepository: string;
  awsEcrSnsTopic?: string;
  logSubscriberUrl?: string;
}

// gets all services - only top level data - assumes one pipeline
async function getAll() {
  try {
    const allServices = await prisma.service.findMany();

    // Retrieve env vars for all services
    const envVars = await envVarsService.getAll(ResourceType.SERVICE);
    // Group env vars by service id
    const groupedEnvVars = envVars?.reduce(
      (entryMap, e) =>
        entryMap.set(e.resourceId, [...(entryMap.get(e.resourceId) || []), e]),
      new Map(),
    );
    // Insert into the associated pipeline object inside allServices
    allServices.forEach((service) => {
      const envVarsForService: EnvironmentVariable[] = groupedEnvVars?.get(
        service.id,
      );
      const flattenedEnvVars: { [key: string]: string } = {};
      envVarsForService?.forEach((envVar) => {
        flattenedEnvVars[envVar.name] = envVar.value;
      });
      Object.assign(service, flattenedEnvVars);
    });

    await prisma.$disconnect();
    return allServices;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function getOne(serviceId: string) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    // Retrieve env vars for this service
    const envVars = await envVarsService.getOne(
      ResourceType.SERVICE,
      serviceId,
    );
    // Insert env vars into the pipeline object
    const flattenedEnvVars: { [key: string]: string } = {};
    envVars?.forEach((envVar) => {
      flattenedEnvVars[envVar.name] = envVar.value;
    });

    await prisma.$disconnect();
    return { ...service, ...flattenedEnvVars } as ServiceWithEnvVars;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function createOne(serviceData: any) {
  const { awsEcrRepo, awsEcsService, ...serviceTableData } = serviceData;

  try {
    const service = await prisma.service.create({
      data: serviceTableData,
    });

    const envVarsCount = await prisma.environmentVariable.createMany({
      data: [
        {
          name: 'awsEcrRepo',
          value: awsEcrRepo,
          resourceId: service.id,
          resourceType: ResourceType.SERVICE,
        },
        {
          name: 'awsEcsService',
          value: awsEcsService,
          resourceId: service.id,
          resourceType: ResourceType.SERVICE,
        },
      ],
    });

    await prisma.$disconnect();
    return [service, envVarsCount];
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function deleteOne(id: any) {
  try {
    const deleted = await prisma.service.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return deleted;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function updateOne(id: any, data: any) {
  try {
    const updated = await prisma.service.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return updated;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create new Task Definition pointing to Docker image tagged with the specified commit hash, and deploy to ECS service (Production cluster)
async function rollback(id: string, commitHash: string) {
  try {
    // Retrieve info about the Service and its Pipeline
    const service = await getOne(id);
    if (!service || !service?.pipelineId)
      throw new Error('Failed to get Service');

    const pipeline = await pipelinesService.getOne(service.pipelineId);
    if (!pipeline) throw new Error('Failed to get Pipeline');

    const { awsRegion, awsEcsCluster } = pipeline;
    const { awsEcsService, awsEcrRepository } = service;

    const ecsClient = ecsService.createEcsClient(awsRegion);

    // Find Task Definition currently used by Service
    const taskDefinition = await ecsService.findTaskDefinitionForService(
      ecsClient,
      awsEcsService,
      awsEcsCluster,
    );

    // Update with new tag (git commit hash)
    const newTaskDefinition =
      await ecsService.updateTaskDefinitionWithNewImageTag(
        awsRegion,
        awsEcrRepository,
        taskDefinition,
        commitHash,
      );

    // Register new Task Definition on ECR
    const registeredTaskDefinition = await ecsService.registerTaskDefinition(
      ecsClient,
      newTaskDefinition,
    );

    // Update the ECS Service
    const response = await ecsService.updateServiceWithNewTaskDefinition(
      ecsClient,
      awsEcsService,
      awsEcsCluster,
      registeredTaskDefinition,
    );

    return response;
  } catch (e) {
    console.error(e);
  }
}

export default { getAll, getOne, createOne, deleteOne, updateOne, rollback };
