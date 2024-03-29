import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { zeroAddress } from 'viem';
import { mock } from 'wagmi/connectors';
import anvil from './anvil';

export function random() {
  const account = typeof window !== 'undefined' ? privateKeyToAccount(generatePrivateKey()) : undefined;
  if (account) void anvil.setBalance({ address: account.address, value: 10n ** 18n });

  return mock({ accounts: [account ? account.address : zeroAddress], features: { reconnect: true } });
}

export function test() {
  return mock({
    accounts: [
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
      '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
      '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
      '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    ],
    features: { reconnect: true },
  });
}
