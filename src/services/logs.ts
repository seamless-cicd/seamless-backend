// import { decodeTime } from 'ulidx';
// import axios from 'axios';
// import { API_KEY, GET_LAMBDA, SET_LAMBDA } from '../utils/config';
import { Redis } from 'ioredis';
import { LogData, StageId } from '../routers/public/logs';

async function getAllForStage(redisClient: Redis, stageId: StageId) {
  // Temporary Lambda
  // const response = await axios.get(GET_LAMBDA, {
  //   params: { stageId },
  //   headers: {
  //     'x-api-key': API_KEY,
  //   },
  //   responseType: 'json',
  // });
  // return await response.data;

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
  // Temporary Lambda
  // const response = await axios.post(
  //   SET_LAMBDA,
  //   { ...logData, score: logData.score || decodeTime(logData.id) },
  //   {
  //     headers: {
  //       'x-api-key': API_KEY,
  //     },
  //   },
  // );
  // return await response.data;

  try {
    if (!logData.stageId) return null;
    // Insert log into Redis, sorted by timestamp
    await redisClient.zadd(
      `${logData.stageId}`, // key
      Number(logData.score), // score
      JSON.stringify(logData), // data string
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
