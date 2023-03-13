import mockAxios from 'jest-mock-axios';
import {
  exampleGetRequestParams,
  exampleRequestUrl,
  createTestHttpClient,
  exampleRequestData,
  examplePutRequestConfig,
  exampleResponseWrappedWithData,
  exampleResponseUnwrapped,
} from '../__tests-support__';

afterEach(() => {
  mockAxios.reset();
});

describe('Http client module', () => {
  const expectLastRequestMethodToBe = (expectedMethod: string) => {
    const lastRequest = mockAxios.lastReqGet();
    expect(lastRequest.method).toEqual(expectedMethod);
  };

  const expectResponseToBeUnwrappedFromData = async (
    requestPromise: Promise<unknown>
  ) => {
    mockAxios.mockResponse(exampleResponseWrappedWithData);
    const result = await requestPromise;
    expect(result).toEqual(exampleResponseUnwrapped);
  };

  it('get request without params have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.get(exampleRequestUrl);

    // Then
    expectLastRequestMethodToBe('get');
    expect(mockAxios.get).toHaveBeenCalledWith(exampleRequestUrl, {
      params: undefined,
    });
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('get request with params have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.get(exampleRequestUrl, {
      params: exampleGetRequestParams,
    });

    // Then
    expectLastRequestMethodToBe('get');
    expect(mockAxios.get).toHaveBeenCalledWith(exampleRequestUrl, {
      params: exampleGetRequestParams,
    });
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('post request have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.post(exampleRequestUrl, exampleRequestData);

    // Then
    expectLastRequestMethodToBe('post');
    expect(mockAxios.post).toHaveBeenCalledWith(
      exampleRequestUrl,
      exampleRequestData,
      undefined
    );
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('put request without config have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.put(exampleRequestUrl, exampleRequestData);

    // Then
    expectLastRequestMethodToBe('put');
    expect(mockAxios.put).toHaveBeenCalledWith(
      exampleRequestUrl,
      exampleRequestData,
      undefined
    );
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('put request with config have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.put(
      exampleRequestUrl,
      exampleRequestData,
      examplePutRequestConfig
    );

    // Then
    expectLastRequestMethodToBe('put');
    expect(mockAxios.put).toHaveBeenCalledWith(
      exampleRequestUrl,
      exampleRequestData,
      examplePutRequestConfig
    );
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('patch request have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.patch(exampleRequestUrl, exampleRequestData);

    // Then
    expectLastRequestMethodToBe('patch');
    expect(mockAxios.patch).toHaveBeenCalledWith(
      exampleRequestUrl,
      exampleRequestData
    );
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });

  it('delete request have been called successfully', async () => {
    // Given
    const client = createTestHttpClient();

    // When
    const requestPromise = client.delete(exampleRequestUrl);

    // Then
    expectLastRequestMethodToBe('delete');
    expect(mockAxios.delete).toHaveBeenCalledWith(exampleRequestUrl);
    await expectResponseToBeUnwrappedFromData(requestPromise);
  });
});
