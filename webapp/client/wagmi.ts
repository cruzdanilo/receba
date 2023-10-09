'use client';

import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { createConfig, http } from 'wagmi';
import { foundry } from 'viem/chains';
import { test } from '../e2e/utils/connectors';
import chain from '../app/chain';

const projectId = 'f1e5a989573bf31c595b3642fffa6036';

export const config = createConfig({
  chains: [chain],
  transports: { [chain.id]: http() },
  connectors:
    chain.id === foundry.id
      ? [test()]
      : [injected(), coinbaseWallet({ appName: 'receba' }), walletConnect({ projectId })],
});
