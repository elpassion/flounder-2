import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClientOptions {
  url: string;
  accessToken?: string;
  useRequestConfig?: (
    requestConfig: AxiosRequestConfig
  ) => Promise<AxiosRequestConfig>;
}

export class HttpClient {
  private readonly client: AxiosInstance;
  private readonly options: HttpClientOptions;

  constructor(options: HttpClientOptions) {
    this.options = options;
    this.client = axios.create({
      baseURL: this.options.url,
      headers: this.getHeaders(),
    });

    this.client.interceptors.request.use((config: AxiosRequestConfig) =>
      this.options.useRequestConfig
        ? this.options.useRequestConfig(config)
        : config
    );
  }

  async get<ReturnType>(
    url: string,
    { params }: { params?: Record<string, unknown> } = {}
  ): Promise<ReturnType> {
    const { data } = await this.client.get<ReturnType>(url, { params });
    return data;
  }

  async post<RequestDataType, ReturnType = void>(
    url: string,
    requestData: RequestDataType
  ): Promise<ReturnType> {
    const { data } = await this.client.post<
      RequestDataType,
      AxiosResponse<ReturnType>
    >(url, requestData);
    return data;
  }

  async put<RequestDataType, ReturnType = void>(
    url: string,
    requestData: RequestDataType,
    config?: AxiosRequestConfig
  ): Promise<ReturnType> {
    const { data } = await this.client.put<RequestDataType, AxiosRequestConfig>(
      url,
      requestData,
      config
    );

    return data;
  }

  async patch<RequestDataType, ReturnType = void>(
    url: string,
    requestData: RequestDataType
  ): Promise<ReturnType> {
    const { data } = await this.client.patch<
      RequestDataType,
      AxiosResponse<ReturnType>
    >(url, requestData);
    return data;
  }

  async delete<RequestDataType, ReturnType = void>(
    url: string
  ): Promise<ReturnType> {
    const { data } = await this.client.delete<
      RequestDataType,
      AxiosResponse<ReturnType>
    >(url);

    return data;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'X-Request-Id': uuid4(),
      ...(this.options.accessToken
        ? { Authorization: `Bearer ${this.options.accessToken}` }
        : {}),
    };
  }
}
