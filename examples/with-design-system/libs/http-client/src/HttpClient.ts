import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpClientOptions {
  url: string;
  accessToken?: string;
  useRequestConfig?: (
    requestConfig: AxiosRequestConfig
  ) => Promise<AxiosRequestConfig>;
}

export class HttpClient {
  private static instance: HttpClient;
  private readonly client: AxiosInstance;
  private readonly options: IHttpClientOptions;

  constructor(options: IHttpClientOptions) {
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

  public static getInstance(options: IHttpClientOptions): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(options);
    }
    return HttpClient.instance;
  }

  async get<TReturnType>(
    url: string,
    { params }: { params?: Record<string, unknown> } = {}
  ): Promise<TReturnType> {
    const { data } = await this.client.get<TReturnType>(url, { params });
    return data;
  }

  async post<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig
  ): Promise<TReturnType> {
    const { data } = await this.client.post<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url, requestData, config);
    return data;
  }

  async put<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig
  ): Promise<TReturnType> {
    const { data } = await this.client.put<
      TRequestDataType,
      AxiosRequestConfig
    >(url, requestData, config);

    return data;
  }

  async patch<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType
  ): Promise<TReturnType> {
    const { data } = await this.client.patch<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url, requestData);
    return data;
  }

  async delete<TRequestDataType, TReturnType = void>(
    url: string
  ): Promise<TReturnType> {
    const { data } = await this.client.delete<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url);

    return data;
  }

  private getHeaders(): Record<string, string> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'X-Request-Id': uuid4(),
      ...(this.options.accessToken
        ? { Authorization: `Bearer ${this.options.accessToken}` }
        : {}),
    };
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}
