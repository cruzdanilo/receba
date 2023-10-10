'use server';

import { cache } from 'react';
import { revalidateTag } from 'next/cache';
import { getEventSelector } from 'viem';
import { getPublicClient } from '@wagmi/core';
import { recebaAddress as address } from '../app/chain';
import { config } from './wagmi';

const event = {
  type: 'event',
  name: 'Deposit',
  inputs: [
    { name: 'commitment', type: 'bytes32', indexed: true },
    { name: 'leafIndex', type: 'uint32', indexed: true },
  ],
} as const;

export default cache(async function getDeposits() {
  const logs = await getPublicClient(config).getLogs({ address, event });
  return logs.map(({ args }) => args);
});

export async function revalidate() {
  revalidateTag(`{"method":"eth_getLogs","params":[{"address":"${address}","topics":["${getEventSelector(event)}"]}]}`);
}
