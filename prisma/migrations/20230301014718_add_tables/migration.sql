-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'FAILURE', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "TriggerType" AS ENUM ('COMMIT', 'PR_OPEN', 'PR_SYNC');

-- AlterTable
ALTER TABLE "EnvironmentVariable" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Pipeline" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "githubPat" TEXT NOT NULL,
    "awsAccessKey" TEXT NOT NULL,
    "awsSecretAccessKey" TEXT NOT NULL,
    "awsFargateCluster" TEXT NOT NULL,
    "lastRunAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "triggerOnCommit" BOOLEAN NOT NULL DEFAULT false,
    "triggerOnPrOpen" BOOLEAN NOT NULL DEFAULT false,
    "triggerOnPrSync" BOOLEAN NOT NULL DEFAULT false,
    "useStaging" BOOLEAN NOT NULL DEFAULT false,
    "githubRepository" TEXT NOT NULL,
    "awsEcrRepository" TEXT NOT NULL,
    "awsFargateService" TEXT NOT NULL,
    "testCommand" TEXT,
    "codeQualityCommand" TEXT,
    "dockerfilePath" TEXT NOT NULL,
    "pipelineId" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "commitHash" TEXT NOT NULL,
    "commitMessage" TEXT,
    "committer" TEXT,
    "status" "Status" NOT NULL,
    "triggerType" "TriggerType" NOT NULL,
    "serviceId" INTEGER,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "status" "Status" NOT NULL,
    "containerId" TEXT,
    "runId" INTEGER,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Service_pipelineId_idx" ON "Service"("pipelineId");

-- CreateIndex
CREATE INDEX "Run_serviceId_idx" ON "Run"("serviceId");

-- CreateIndex
CREATE INDEX "Stage_runId_idx" ON "Stage"("runId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;
