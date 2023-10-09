import { baseGoerli, foundry, type Chain } from 'viem/chains';
import { deliverableAddress as deliverable } from './contracts';
import type { Address } from 'viem';

const chain = {
  [baseGoerli.id]: baseGoerli,
  [foundry.id]: foundry,
}[Object.keys(deliverable)[0]] as Chain;

export default chain;
export const deliverableAddress = (deliverable as Record<number, Address>)[chain.id];
