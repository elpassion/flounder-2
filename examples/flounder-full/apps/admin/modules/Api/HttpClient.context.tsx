import React, { createContext, useContext, ReactNode } from 'react';
import { HttpClient } from '@flounder/http-client';
import { createHttpClient } from '@flounder/next-utils';

export const HttpClientContext = createContext<HttpClientContextType>({
  httpClient: createHttpClient(),
});

type HttpClientContextType = {
  httpClient: HttpClient;
};

const HttpClientContextProvider = ({ children }: { children: ReactNode }) => {
  const httpClient = createHttpClient();

  return <HttpClientContext.Provider value={{ httpClient }}>{children}</HttpClientContext.Provider>;
};

export default HttpClientContextProvider;

export const useHttpClient = (): HttpClientContextType => useContext(HttpClientContext);
