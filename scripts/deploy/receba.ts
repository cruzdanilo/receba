import type { DeployFunction } from 'hardhat-deploy/types';

const fn: DeployFunction = async ({ deployments: { deploy }, getNamedAccounts }) => {
  const { deployer: from } = await getNamedAccounts();
  const { address: verifier } = await deploy('UltraVerifier', { from, log: true });
  const { address: deliverable } = await deploy('Deliverable', { from, log: true });
  await deploy('Receba', { args: [deliverable, 10n ** 16n, verifier], from, log: true });
};

fn.tags = ['receba'];
export default fn;
