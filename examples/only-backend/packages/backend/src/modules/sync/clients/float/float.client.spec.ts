import { HttpService } from '@nestjs/axios';
import { FloatClient } from './float.client';
import { withRecording } from '../../../../../test/__tests-support__/tapes/withRecording';

describe('FloatClient', () => {
  describe('getTimeoffs', () => {
    it('throws ClientError when something goes wrong', async () => {
      await withRecording(__dirname, 'bad request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: 'mockToken',
          floatTimeoffTypeId: 472564,
        });
        await expect(() => client.getTimeOffs(new Date('2023-01-04'))).rejects.toThrowError(
          FloatClient.FloatClientError,
        );
      });
    });

    it('returns correct timeoffs', async () => {
      await withRecording(__dirname, 'successful request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: 'mockToken',
          floatTimeoffTypeId: 472564,
        });
        expect(await client.getTimeOffs(new Date('2023-01-04'))).toMatchSnapshot();
      });
    });
  });

  describe('createTimeOff', () => {
    it('throws ClientError when something goes wrong', async () => {
      await withRecording(__dirname, 'bad post request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: 'mockToken',
          floatTimeoffTypeId: 472564,
        });
        await expect(() =>
          client.createTimeOff('2050-01-01', '2020-10-12', 123, 'CALAMARI XXX'),
        ).rejects.toThrowError(FloatClient.FloatClientError);
      });
    });

    it('return created timeoff', async () => {
      await withRecording(__dirname, 'successful post request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: 'mock_token',
          floatTimeoffTypeId: 474348,
        });
        expect(
          await client.createTimeOff('2023-08-15', '2023-08-20', 17948762, 'CALAMARI XXX'),
        ).toMatchSnapshot();
      });
    });
  });

  describe('removeTimeoff', () => {
    it('throws ClientError when something goes wrong', async () => {
      await withRecording(__dirname, 'bad delete request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: '95e558243319b10dAcMEDEDmWVG1NFGvdPlf3yrLBkoC9tFNAu8qpRSr2Y0=',
          floatTimeoffTypeId: 472564,
        });
        await expect(() => client.removeTimeoff(43567890876543456)).rejects.toThrowError(
          FloatClient.FloatClientError,
        );
      });
    });

    it('return delete status', async () => {
      await withRecording(__dirname, 'successful delete request', async () => {
        const client = new FloatClient(new HttpService(), {
          floatToken: '95e558243319b10dAcMEDEDmWVG1NFGvdPlf3yrLBkoC9tFNAu8qpRSr2Y0=',
          floatTimeoffTypeId: 474348,
        });
        expect(await client.removeTimeoff(15095042)).toEqual(204);
      });
    });
  });
});
