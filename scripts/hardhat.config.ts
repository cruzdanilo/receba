import 'dotenv/config';
import 'hardhat-deploy';
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import type { HardhatUserConfig } from 'hardhat/types';
import { env } from 'process';

export default {
  solidity: { version: '0.8.21', settings: { optimizer: { enabled: true, runs: 200 } } },
  networks: env.MNEMONIC && {
    optimism: { url: env.RPC_URL_HTTP ?? 'https://mainnet.optimism.io', accounts: { mnemonic: env.MNEMONIC } },
    testnet: { url: env.TEST_RPC_URL_HTTP ?? 'https://goerli.base.org', accounts: { mnemonic: env.MNEMONIC } },
  },
  namedAccounts: { deployer: { default: 0 } },
  paths: {
    root: '..',
    artifacts: '.artifacts/hardhat',
    cache: '.cache/hardhat',
    tests: 'scripts/test',
    deploy: 'scripts/deploy',
  },
  typechain: { outDir: 'scripts/types', target: 'ethers-v6' },
} as HardhatUserConfig;
