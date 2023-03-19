import { ServiceEditFormType, ServiceFormType } from '../schemas/form-schema';
import ecsService from '../utils/aws-sdk/ecs';
import prisma from '../utils/prisma-client';
import pipelinesService from './pipelines';

// Get all Services in the database - assumes all Service belong to a single pipeline
async function getAll() {
  try {
    const services = await prisma.service.findMany();
    await prisma.$disconnect();
    return services;
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
    await prisma.$disconnect();
    return service;
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

    await prisma.$disconnect();
    return service;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create a Service, using form data
async function createOne(serviceFormData: ServiceFormType) {
  try {
    const createdService = await prisma.service.create({
      data: serviceFormData,
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

    const repoPath = service.githubRepoUrl.match(
      /\/([^/]+\/[^/.]+)(?:\.git)?$/,
    )?.[1];

    const images = ecsService.getAllImages(repoPath || '');
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

    const { awsEcsCluster } = pipeline;
    const { awsEcsService } = service;

    const ecsClient = ecsService.createEcsClient();

    // Find Task Definition currently used by Service
    const taskDefinition = await ecsService.findTaskDefinitionForService(
      ecsClient,
      awsEcsService,
      awsEcsCluster,
    );

    // Update with new tag (git commit hash)
    const newTaskDefinition =
      await ecsService.updateTaskDefinitionWithNewImageTag(
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
