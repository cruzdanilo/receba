import { foundry as chain } from 'viem/chains';
import { defineConfig } from '@wagmi/cli';
import { getAddress } from 'viem';
import { foundry } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'app/contracts.ts',
  plugins: [
    foundry({
      project: '..',
      deployments: {
      },
    }),
  ],
});
