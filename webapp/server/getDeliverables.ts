'use server';

import { cache } from 'react';
import { revalidateTag } from 'next/cache';
import { getFunctionSelector } from 'viem';
import { readContract, readContracts } from '@wagmi/core';
import { deliverableAddress as address } from '../app/chain';
import { deliverableAbi as abi } from '../app/contracts';
import { config } from './wagmi';

export default cache(async function getDeliverables() {
  const total = Number(await readContract(config, { functionName: 'totalSupply', abi, address }));
  return readContracts(config, {
    allowFailure: false,
    contracts: [...Array(total)].map((_, i) => ({ functionName: 'tokenByIndex', args: [i], abi, address })),
  });
});

export async function revalidate() {
  revalidateTag(`${address}:${getFunctionSelector('totalSupply()')}`);
}
