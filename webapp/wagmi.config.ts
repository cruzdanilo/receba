import { foundry as chain } from 'viem/chains';
import { defineConfig } from '@wagmi/cli';
import { getAddress } from 'viem';
import { foundry } from '@wagmi/cli/plugins';
import { address as receba } from '../deployments/localhost/Receba.json' assert { type: 'json' };
import { address as deliverable } from '../deployments/localhost/Deliverable.json' assert { type: 'json' };

export default defineConfig({
  out: 'app/contracts.ts',
  plugins: [
    foundry({
      project: '..',
      deployments: {
        Receba: { [chain.id]: getAddress(receba) },
        Deliverable: { [chain.id]: getAddress(deliverable) },
      },
    }),
  ],
});
