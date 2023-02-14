import { HttpService } from '@nestjs/axios';
import { CalamariClient } from './calamariClient';
import { withRecording } from '../../../../../test/__tests-support__/tapes/withRecording';

describe('CalamariClient', () => {
  describe('getTimeoffs', () => {
    it('throws ClientError when something goes wrong', async () => {
      await withRecording(__dirname, 'bad request', async () => {
        const client = new CalamariClient(new HttpService(), {
          calamariApiUrl: 'https://elpassion.calamari.io/api/leave/request/v1/find-advanced/',
          calamariApiUsername: 'calamari',
          calamariApiKey: 'mockCalamariApiKey',
        });

        await expect(() => client.getTimeOffs(new Date('2023-01-04'))).rejects.toThrowError(
          CalamariClient.CalamariClientError,
        );
      });
    });

    it('return correct timeoffs', async () => {
      await withRecording(__dirname, 'successful request', async () => {
        const client = new CalamariClient(new HttpService(), {
          calamariApiUrl: 'https://elpassion.calamari.io/api/leave/request/v1/find-advanced/',
          calamariApiUsername: 'calamari',
          calamariApiKey: 'mockCalamariApiKey',
        });

        expect(await client.getTimeOffs(new Date('2023-01-04'))).toMatchSnapshot();
      });
    });
  });
});
