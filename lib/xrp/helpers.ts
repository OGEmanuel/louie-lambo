'use server';

import xrpl, { Wallet } from 'xrpl';
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

// const stakingWallet = xrpl.Wallet.fromSeed('YOUR_STAKING_POOL_SECRET'); // Staking pool wallet

// async function stakeTokens(
//   userWallet: Wallet,
//   amount: number,
//   tokenIssuer: string,
// ) {
//   const client = new xrpl.Client(XRP_MAINNET_RPC); // Testnet URL
//   await client.connect();

//   const stakeTx = {
//     TransactionType: 'Payment',
//     Account: userWallet.address,
//     Destination: stakingWallet.address,
//     Amount: {
//       currency: 'MYTOKEN',
//       value: amount.toFixed(6), // Ensure proper decimal formatting
//       issuer: tokenIssuer,
//     },
//   };

//   const prepared = await client.autofill(stakeTx);
//   const signed = userWallet.sign(prepared);
//   const result = await client.submitAndWait(signed.tx_blob);

//   if (result.result.engine_result === 'tesSUCCESS') {
//     console.log(`✅ ${amount} MYTOKEN staked from ${userWallet.address}`);
//     // Save stake details in database (userWallet.address, amount, timestamp)
//   } else {
//     console.log(`❌ Staking failed:`, result.result.engine_result_message);
//   }

//   return result;
// }

// const userWallet = xrpl.Wallet.fromSeed('USER_SECRET');
// await stakeTokens(userWallet, 100, 'rIssuerAddress123');
