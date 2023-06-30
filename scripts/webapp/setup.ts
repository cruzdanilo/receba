import { deployments, network, ethers } from 'hardhat';

if (network.live) throw new Error('development only');

Promise.all([
  deployments.run('receba', { deletePreviousDeployments: true, writeDeploymentsToFiles: true }),
  ethers.getSigners(),
]).then(async ([{ Deliverable }, signers]) => {
});
