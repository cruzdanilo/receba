import type { DeployFunction } from 'hardhat-deploy/types';

const fn: DeployFunction = async ({ deployments: { deploy }, getNamedAccounts }) => {
  const { deployer: from } = await getNamedAccounts();
  await deploy('Deliverable', { from, log: true });
};

fn.tags = ['receba'];
export default fn;
