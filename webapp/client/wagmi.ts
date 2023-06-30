'use client';

import { foundry } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { test } from '../e2e/utils/connectors';

const projectId = 'f1e5a989573bf31c595b3642fffa6036';

export const config = createConfig({
  chains: [foundry],
  transports: { [foundry.id]: http() },
  connectors: JSON.parse(process.env.NEXT_PUBLIC_E2E ?? 'false')
    ? [test()]
    : [injected(), coinbaseWallet({ appName: 'receba' }), walletConnect({ projectId })],
});
