import type { DeployFunction } from 'hardhat-deploy/types';

const fn: DeployFunction = async ({ deployments: { deploy }, getNamedAccounts }) => {
  const { deployer: from } = await getNamedAccounts();
};

fn.tags = ['receba'];
export default fn;
