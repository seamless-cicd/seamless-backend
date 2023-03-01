/*
  Warnings:

  - The primary key for the `EnvironmentVariable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pipeline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Run` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Stage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `EnvironmentVariable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pipeline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_pipelineId_fkey";

-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_runId_fkey";

-- AlterTable
ALTER TABLE "EnvironmentVariable" DROP CONSTRAINT "EnvironmentVariable_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EnvironmentVariable_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EnvironmentVariable_id_seq";

-- AlterTable
ALTER TABLE "Pipeline" DROP CONSTRAINT "Pipeline_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "lastRunAt" DROP NOT NULL,
ADD CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pipeline_id_seq";

-- AlterTable
ALTER TABLE "Run" DROP CONSTRAINT "Run_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "commitHash" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS',
ALTER COLUMN "serviceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Run_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Run_id_seq";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "triggerOnCommit" SET DEFAULT true,
ALTER COLUMN "dockerfilePath" DROP NOT NULL,
ALTER COLUMN "pipelineId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Service_id_seq";

-- AlterTable
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS',
ALTER COLUMN "runId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Stage_id_seq";

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "data" JSONB,
    "stageId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_stageId_key" ON "Log"("stageId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
