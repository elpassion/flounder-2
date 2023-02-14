import { HttpService } from '@nestjs/axios';
import { CalamariClient } from '../clients/calamari/calamariClient';
import { FloatClient } from '../clients/float/float.client';
import { SyncTimeoffs } from './sync.timeoffs';
import { withRecording } from '../../../../test/__tests-support__/tapes/withRecording';

describe('Sync Timeoffs', () => {
  let floatClient: FloatClient;
  let calamariClient: CalamariClient;
  let syncTimeoffs: SyncTimeoffs;

  beforeEach(() => {
    calamariClient = new CalamariClient(new HttpService(), {
      calamariApiUrl: 'https://elpassion.calamari.io/api/leave/request/v1/find-advanced/',
      calamariApiUsername: 'calamari',
      calamariApiKey: 'mockApiKey',
    });

    floatClient = new FloatClient(new HttpService(), {
      floatToken: 'mockFloatToken',
      floatTimeoffTypeId: 474348,
    });

    syncTimeoffs = new SyncTimeoffs(calamariClient, floatClient);
  });

  it('should add to float', async () => {
    await withRecording(__dirname, 'sync add float request', async () => {
      calamariClient.getTimeOffs = jest.fn().mockResolvedValueOnce([
        {
          calamariId: 1079,
          endDate: '2023-05-08T00:00:00.000Z',
          personEmail: 'marek.pankowski@elpassion.pl',
          serviceType: 'CALAMARI',
          startDate: '2023-04-28T00:00:00.000Z',
          status: 'ACCEPTED',
          type: 'UZ, UD, B2B| Płatny dzień wolny',
        },
      ]);

      floatClient.getTimeOffs = jest.fn().mockResolvedValueOnce({
        timeoffs: [],
      });

      const addToFloat = jest.fn().mockResolvedValueOnce({});

      syncTimeoffs['addToFloat'] = addToFloat;
      await syncTimeoffs.sync(new Date('2023-01-04'));
      expect(addToFloat).toHaveBeenCalledTimes(1);
    });
  });

  it('should remove from float if status is "canceled" in calamari', async () => {
    await withRecording(__dirname, 'sync remove float request if calamari', async () => {
      calamariClient.getTimeOffs = jest.fn().mockResolvedValueOnce([
        {
          calamariId: 1079,
          endDate: '2023-05-08T00:00:00.000Z',
          personEmail: 'marek.pankowski@elpassion.pl',
          serviceType: 'CALAMARI',
          startDate: '2023-04-28T00:00:00.000Z',
          status: 'CANCELED',
          type: 'UZ, UD, B2B| Płatny dzień wolny',
        },
      ]);

      floatClient.getTimeOffs = jest.fn().mockResolvedValueOnce({
        timeoffs: [
          {
            id: 15124320,
            startDate: '2023-01-05T00:00:00.000Z',
            endDate: '2023-01-05T00:00:00.000Z',
            calamariId: 1079,
            personId: 17949676,
            personEmail: 'oskar.kupski@elpassion.pl',
            serviceType: 'FLOAT',
          },
        ],
      });

      const removeFromFloat = jest.fn().mockResolvedValueOnce({});

      syncTimeoffs['removeFromFloat'] = removeFromFloat;
      await syncTimeoffs.sync(new Date('2023-01-04'));
      expect(removeFromFloat).toHaveBeenCalledTimes(1);
    });
  });

  it('should remove from float if only exists in float', async () => {
    await withRecording(__dirname, 'sync remove float request if float', async () => {
      calamariClient.getTimeOffs = jest.fn().mockResolvedValueOnce([]);

      floatClient.getTimeOffs = jest.fn().mockResolvedValueOnce({
        timeoffs: [
          {
            id: 15124319,
            startDate: '2023-01-02T00:00:00.000Z',
            endDate: '2023-01-05T00:00:00.000Z',
            calamariId: 1210,
            personId: 17948762,
            personEmail: 'marek.pankowski@elpassion.pl',
            serviceType: 'FLOAT',
          },
          {
            id: 15124318,
            startDate: ' 2023-02-03T00:00:00.000Z',
            endDate: '2023-02-03T00:00:00.000Z',
            calamariId: 1161,
            personId: 17949676,
            personEmail: 'oskar.kupski@elpassion.pl',
            serviceType: 'FLOAT',
          },
        ],
      });

      const removeFromFloat = jest.fn();

      syncTimeoffs['removeFromFloat'] = removeFromFloat;
      await syncTimeoffs.sync(new Date('2023-01-04'));
      expect(removeFromFloat).toHaveBeenCalledTimes(2);
    });
  });

  it('should sync timeoffs', async () => {
    await withRecording(__dirname, 'sync request', async () => {
      expect(
        await new SyncTimeoffs(calamariClient, floatClient).sync(new Date('2023-01-04')),
      ).toMatchSnapshot();
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
