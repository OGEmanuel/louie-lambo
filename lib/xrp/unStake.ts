'use server';

import xrpl from 'xrpl';
import {
  LAMBO_TOKEN_CODE,
  LAMBO_TOKEN_ISSUER,
  XRP_MAINNET_RPC,
} from '../constants';
import Setting from '@/lib/models/setting';
import connectDB from '../db';

export async function unstakeTokens(
  userAddress: string,
  stakedAmount: number,
  isEarly: boolean,
) {
  await connectDB();
  const refundAmount = isEarly ? stakedAmount * 0.5 : stakedAmount;

  const client = new xrpl.Client(XRP_MAINNET_RPC);
  await client.connect();

  const setting = await Setting.findOne({});
  const stakingWallet = xrpl.Wallet.fromSeed(setting.tokenPoolWalletSeed);

  const prepared = await client.autofill({
    TransactionType: 'Payment',
    Account: stakingWallet.address,
    Destination: userAddress,
    Amount: {
      currency: LAMBO_TOKEN_CODE,
      value: refundAmount.toFixed(6),
      issuer: LAMBO_TOKEN_ISSUER,
    },
  });

  const signed = stakingWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  if (result.result.tx_json.TxnSignature) {
    return result;
  } else {
    console.log(`❌ Unstaking failed:`);
    throw new Error('something went wrong');
  }
}
