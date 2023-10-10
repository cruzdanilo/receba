import { rpc } from 'viem/utils';
import { createConfig } from '@wagmi/core';
import { createPublicClient, createTransport, fallback, RpcRequestError } from 'viem';
import appChain from '../app/chain';

export const config = createConfig({
  chains: [appChain],
  storage: null,
  connectors: [],
  syncConnectedChain: false,
  client: ({ chain }) =>
    createPublicClient({
      chain,
      batch: { multicall: false },
      transport: fallback(
        chain.rpcUrls.default.http.map(
          (url) => () =>
            createTransport(
              {
                key: 'http',
                type: 'http',
                name: 'HTTP JSON-RPC',
                async request({ method, params }) {
                  const body = { method, params, id: 0 }; // id 0 for caching
                  const tags = [JSON.stringify({ method, params: tagParams(params) })];
                  const { error, result } = await rpc.http(url, { body, fetchOptions: { next: { tags } } });
                  if (error) throw new RpcRequestError({ body, error, url });
                  return result;
                },
              },
              { url },
            ),
        ),
      ),
    }),
});

function tagParams(params: unknown) {
  if (Array.isArray(params) && params[params.length - 1] === 'latest') return params.slice(0, -1);
  return params;
}
