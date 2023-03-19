import { Redis } from 'ioredis';
import { LogData, StageId } from '../routers/public/logs';

async function getAllForStage(redisClient: Redis, stageId: StageId) {
  try {
    const logs = await redisClient.zrange(stageId, 0, -1);
    const parsedLogs: LogData[] = logs.map((log) => JSON.parse(log));
    return parsedLogs;
  } catch (e) {
    console.error(e);
    throw new Error('Error getting logs');
  }
}

async function createOne(redisClient: Redis, logData: LogData) {
  try {
    if (!logData.stageId) return null;

    // Insert log into Redis, sorted by timestamp
    await redisClient.zadd(
      `${logData.stageId}`, // Redis key
      Number(logData.score), // timestamp converted to milliseconds
      JSON.stringify(logData),
      async (err, result) => {
        if (err) {
          throw new Error('Failed to add log.');
        } else {
          console.log(
            `Added log ${logData.id} to sorted set ${logData.stageId}.`,
          );
          // Expire all logs for stage after 48 hrs
          await redisClient.expire(logData.stageId, 60 * 60 * 48);
          return result;
        }
      },
    );
  } catch (e) {
    console.error(e);
    throw new Error('Error creating log');
  }
}

export default { getAllForStage, createOne };
