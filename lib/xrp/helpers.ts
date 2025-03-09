'use server';

import xrpl from 'xrpl';
import { XRP_MAINNET_RPC } from '../constants';

export async function getTokenBalance(
  walletAddress: string,
  tokenIssuer: string,
  tokenCode: string,
) {
  const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);
  await xrpClient.connect();

  const response = await xrpClient.request({
    command: 'account_lines',
    account: walletAddress,
  });

  xrpClient.disconnect();
  const trustLine = response.result.lines.find(
    line => line.currency === tokenCode && line.account === tokenIssuer,
  );

  return trustLine ? trustLine.balance : '0';
}

export async function createWallet() {
  const wallet = xrpl.Wallet.generate();
  return { address: wallet.classicAddress, seed: wallet.seed };
}
