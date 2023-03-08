import { decodeTime } from 'ulidx';
import axios from 'axios';
import { Redis } from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '../utils/config';
import { StageId, LogData } from '../routers/logs';

const client = new Redis(REDIS_PORT, REDIS_HOST, {
  connectTimeout: 2000,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
  reconnectOnError: (err) => err.message.includes('READONLY'),
  retryStrategy: (times: number) => 2000,
});

// Status messages
client
  .on('connect', () => {
    console.log('Connecting');
  })
  .on('ready', () => {
    console.log('Successfully connected');
  })
  .on('reconnecting', () => {
    console.log('Reconnecting');
  })
  .on('error', (err) => {
    console.log('Error', err);
    client.disconnect();
  })
  .on('close', () => {
    console.log('Closing connection');
    client.disconnect();
  });

async function getAllForStage(stageId: StageId) {
  // Temporary Lambda
  const response = await axios.get(
    'https://xoapnb77vxbrwgkfmrocw2jdly0zyumk.lambda-url.us-east-1.on.aws',
    {
      params: { stageId },
      headers: {
        'x-api-key': '10ba2900-c0e0-44f1-a674-4bc6f1412554',
      },
      responseType: 'json',
    },
  );
  return await response.data;

  // For Redis
  // try {
  //   await client.connect();

  //   const logs = await client.zrange(stageId, 0, -1);
  //   const parsedLogs: LogData[] = logs.map((log) => JSON.parse(log));

  //   client.disconnect();

  //   return parsedLogs;
  // } catch (e) {
  //   console.error(e);
  //   client.disconnect();
  //   throw new Error('Error getting logs');
  // }
}

async function createOne(logData: LogData) {
  // Temporary Lambda
  const response = await axios.post(
    'https://ihly3zjagklnu5miik7jtifvqq0vatwl.lambda-url.us-east-1.on.aws',
    { ...logData, score: decodeTime(logData.id) },
    {
      headers: {
        'x-api-key': '10ba2900-c0e0-44f1-a674-4bc6f1412554',
      },
    },
  );
  return await response.data;

  // For Redis
  // try {
  //   if (!logData.stageId) return null;
  //   await client.connect();
  //   // Insert log into Redis, sorted by timestamp
  // await client.zadd(
  //   `${logData.stageId}`, // key
  //   logData.timestamp.toString(), // score
  //   JSON.stringify(logData), // data string
  //   async (err, result) => {
  //     if (err) {
  //       throw new Error('Failed to add log.');
  //     } else {
  //       console.log(
  //         `Added log ${logData.id} to sorted set ${logData.stageId}.`,
  //       );
  //       // Expire all logs for stage after 48 hrs
  //       await client.expire(logData.stageId, 60 * 60 * 48);
  //       client.disconnect();
  //       return result;
  //     }
  //   },
  // );
  // } catch (e) {
  //   console.error(e);
  //   client.disconnect();
  //   throw new Error('Error creating log');
  // }
}

export default { getAllForStage, createOne };
