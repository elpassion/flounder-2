import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyProvider {
  public getForTarget(target: string) {
    return createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',
    });
  }
}
