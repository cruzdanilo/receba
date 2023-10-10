import { baseGoerli, foundry, type Chain } from 'viem/chains';
import { deliverableAddress as deliverable, recebaAddress as receba } from './contracts';
import type { Address } from 'viem';

const chain = {
  [baseGoerli.id]: baseGoerli,
  [foundry.id]: foundry,
}[Object.keys(deliverable)[0]] as Chain;

export default chain;
export const recebaAddress = (receba as Record<number, Address>)[chain.id];
export const deliverableAddress = (deliverable as Record<number, Address>)[chain.id];
