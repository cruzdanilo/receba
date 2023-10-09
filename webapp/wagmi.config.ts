import { readFileSync, readdirSync } from 'fs';
import { defineConfig } from '@wagmi/cli';
import { getAddress } from 'viem';

const deployments = `../deployments/${process.env.NETWORK ?? 'testnet'}`;
const chainId = Number(readFileSync(`${deployments}/.chainId`));

export default defineConfig({
  out: 'app/contracts.ts',
  contracts: readdirSync(deployments)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const { abi, address } = JSON.parse(readFileSync(`${deployments}/${file}`).toString());
      return { name: file.replace('.json', ''), abi, address: { [chainId]: getAddress(address) } };
    }),
});
