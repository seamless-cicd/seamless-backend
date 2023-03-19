import { PrismaClient } from '@prisma/client';
import { deleteAllData } from './seed_data/delete_all_data';
import { seedPipelines } from './seed_data/seed_pipeline';

const prisma = new PrismaClient();

// Reset, then seed
(async function () {
  try {
    await deleteAllData(prisma);
    await seedPipelines();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
