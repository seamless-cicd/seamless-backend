import { SFNClient } from '@aws-sdk/client-sfn';

export const createSfnClient = (
  awsRegion: string,
  awsAccessKey: string,
  awsSecretAccessKey: string,
) => {
  const sfnClient = new SFNClient({
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretAccessKey,
    },
  });

  return sfnClient;
};
