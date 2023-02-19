import { GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { ServerHttpClient } from '@flounder/cognito-auth';

export async function buildState(
  ctx: GetServerSidePropsContext,
  fn: (queryClient: QueryClient, httpClient: ServerHttpClient) => Promise<void>,
): Promise<DehydratedState> {
  const queryClient = new QueryClient();
  const httpClient = await ServerHttpClient.fromRequest({ req: ctx.req });
  if (httpClient) await fn(queryClient, httpClient);
  return dehydrate(queryClient);
}
