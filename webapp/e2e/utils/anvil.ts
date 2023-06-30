import { foundry } from 'viem/chains';
import { createTestClient, http, publicActions, walletActions } from 'viem';

export default createTestClient({ mode: 'anvil', chain: foundry, transport: http() })
  .extend(publicActions)
  .extend(walletActions);
