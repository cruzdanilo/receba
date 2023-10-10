import { buildPoseidon } from 'circomlibjs';
import { deployments, network, ethers } from 'hardhat';
import type { Receba, Deliverable } from '../types';

if (network.live) throw new Error('development only');

Promise.all([
  deployments.run('receba', { deletePreviousDeployments: true, writeDeploymentsToFiles: true }),
  ethers.getSigners(),
]).then(async ([{ Receba, Deliverable }, signers]) => {
  const [receba, deliverable, ...nonces] = await Promise.all([
    ethers.getContractAt(Receba.abi, Receba.address) as unknown as Receba,
    ethers.getContractAt(Deliverable.abi, Deliverable.address) as unknown as Deliverable,
    ...signers.map((signer) => signer.getNonce()),
  ]);
  const poseidon = await buildPoseidon();
  const base = { gasLimit: 1e6, gasPrice: 1e9 };
  const txs = await Promise.all([
    receba.connect(signers[0]).deposit(`0x${poseidon.F.toString(poseidon([69, 420]), 16).padStart(64, '0')}`, {
      value: 10n ** 16n,
      nonce: nonces[0]++,
      ...base,
    }),
    ...signers.map((signer, i) => deliverable.connect(signer).mint({ nonce: nonces[i]++, ...base })),
  ]);
  await Promise.all(txs.map((tx) => tx.wait()));
});
