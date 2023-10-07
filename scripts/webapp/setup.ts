import { deployments, network, ethers } from 'hardhat';
import type { Deliverable } from '../types';

if (network.live) throw new Error('development only');

Promise.all([
  deployments.run('receba', { deletePreviousDeployments: true, writeDeploymentsToFiles: true }),
  ethers.getSigners(),
]).then(async ([{ Deliverable }, signers]) => {
  const deliverable = (await ethers.getContractAt(Deliverable.abi, Deliverable.address)) as unknown as Deliverable;
  await Promise.all(signers.map((signer) => deliverable.connect(signer).mint({ gasLimit: 666_666 })));
});
