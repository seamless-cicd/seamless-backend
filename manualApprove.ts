import { SendTaskSuccessCommand, SFNClient } from '@aws-sdk/client-sfn';

async function sendTaskToken(taskToken: string) {
  const sfnClient = new SFNClient({
    region: 'us-east-1',
  });

  const sfnCommand = new SendTaskSuccessCommand({
    taskToken,
    output: '{}',
  });

  const response = await sfnClient.send(sfnCommand);
  console.log(response);
}

sendTaskToken(
  'AQCYAAAAKgAAAAMAAAAAAAAAAbIxErv2rrBz4V70nYrEsTiIXIUvrLPgBP/siV5TPE1+W3+gXTl1FWYUKyRtS84JluU7b2ksdvKjBcUxqXmJC4xvVVlAAEcc8d7L1Rv1pC3Jm0wokaDCI76LcBLcZHThUyw=/xdIQatsfgougNSo+17fkcX496YcrraQXAKK6CDIhhH2/ypbACMryLpjHBkP+t8r6j4+pINmCT4kuJf00ni+AUIp1IEp7JFvfs/0EMugWvR2BkOSP1uIHKLINj/etpDbje6iV9f66U5Sef5iEOd41i8Q3PJNV8+ZxgVvhj+APotcwAZBMufPYE1NwJJOLvi6d8it9HsZwpf38GbyPPDHHInkf+GlfC35DWPPuvczrSmmdbro0YXtnKHV+t31v79N1+fvkDTaxOOdO8gKKfsH7EPlDiyCVwdYNuEL0qc9TV1WCidcrVBav9eJGPvjsravRg0OU1VHiosD/2zcNNMBVmO+XEFP2GNeARruUgELFZ4kRZms/wVEzELlHdmBimtfiCX9R/fEhzQ3RrYm3OtC5a4RfLZM+FXbVNJGtTh7NLMiOkPlhV9T3Kyc8Skhlj1qIsCP8/5xuzDlUEoG1++hvEc6cJ6tmAT/dXAHHyoflHWavLAg7EB50eF+FblZkoy1v5LfKctY8RhYZBtSAErO',
);
