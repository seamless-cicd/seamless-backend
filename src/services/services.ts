import { EnvironmentVariable, ResourceType, Service } from '@prisma/client';
import { ServiceEditFormType, ServiceFormType } from '../schemas/formSchema';
import ecsService from '../utils/aws-sdk/ecs';
import prisma from '../utils/prisma-client';
import envVarsService from './envVars';
import pipelinesService from './pipelines';

export interface ServiceWithEnvVars extends Service {
  awsEcsService: string;
  awsEcsServiceStaging?: string;
  awsEcrRepository: string;
}

// Get all Services in the database - assumes all Service belong to a single pipeline
async function getAll() {
  try {
    const allServices = await prisma.service.findMany();

    // Retrieve env vars for all Services
    const envVars = await envVarsService.getAll(ResourceType.SERVICE);

    // Group env vars by Service id
    const groupedEnvVars = envVars?.reduce(
      (entryMap, e) =>
        entryMap.set(e.resourceId, [...(entryMap.get(e.resourceId) || []), e]),
      new Map(),
    );

    // Insert env vars into the associated Service inside the allServices Array
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

// Get a Service
async function getOne(serviceId: string) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    // Retrieve env vars for this Service
    const envVars = await envVarsService.getOne(
      ResourceType.SERVICE,
      serviceId,
    );

    // Insert env vars into the Service
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

// Find Service linked to the specified GitHub repository
// Todo: Account for case where multiple Services are linked to the same repo
async function findOneByRepoUrl(githubRepoUrl: string) {
  try {
    const service = await prisma.service.findFirst({
      where: {
        githubRepoUrl,
      },
    });

    if (!service) throw new Error('no service linked to that repo');

    const envVars = await envVarsService.getOne(
      ResourceType.SERVICE,
      service.id,
    );

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

// Create a Service
async function createOne(serviceFormData: ServiceFormType) {
  // Form data includes AWS data which must be inserted into the env vars table
  const { awsEcrRepo, awsEcsService, ...serviceTableData } = serviceFormData;

  try {
    const createdService = await prisma.service.create({
      data: serviceTableData,
    });

    await prisma.environmentVariable.createMany({
      data: [
        {
          name: 'awsEcrRepo',
          value: awsEcrRepo,
          resourceId: createdService.id,
          resourceType: ResourceType.SERVICE,
        },
        {
          name: 'awsEcsService',
          value: awsEcsService,
          resourceId: createdService.id,
          resourceType: ResourceType.SERVICE,
        },
      ],
    });

    await prisma.$disconnect();
    return createdService;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Delete a Service
async function deleteOne(id: string) {
  try {
    const deletedService = await prisma.service.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return deletedService;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Update a Service
async function updateOne(id: string, serviceEditFormData: ServiceEditFormType) {
  try {
    const updatedService = await prisma.service.update({
      where: {
        id,
      },
      data: serviceEditFormData,
    });
    await prisma.$disconnect();
    return updatedService;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Retrieve all images in ECR, for this Service
async function getRollbackImages(id: string) {
  try {
    const service = await getOne(id);
    if (!service || !service?.pipelineId)
      throw new Error('Failed to get Service');

    const pipeline = await pipelinesService.getOne(service.pipelineId);
    if (!pipeline) throw new Error('Failed to get Pipeline');

    const images = ecsService.getAllImages(
      pipeline.awsAccountId,
      pipeline.awsRegion,
      service.awsEcrRepository,
    );
    return images;
  } catch (e) {
    console.error(e);
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

    const { awsAccountId, awsRegion, awsEcsCluster } = pipeline;
    const { awsEcsService } = service;

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
        awsAccountId,
        awsRegion,
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

export default {
  getAll,
  getOne,
  findOneByRepoUrl,
  createOne,
  deleteOne,
  updateOne,
  getRollbackImages,
  rollback,
};
