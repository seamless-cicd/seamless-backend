-- CreateTable
CREATE TABLE "EnvironmentVariables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,

    CONSTRAINT "EnvironmentVariables_pkey" PRIMARY KEY ("id")
);
