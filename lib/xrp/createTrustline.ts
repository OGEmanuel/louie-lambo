'use server';

import xrpl from 'xrpl';
import {
  LAMBO_TOKEN_CODE,
  LAMBO_TOKEN_ISSUER,
  XRP_MAINNET_RPC,
} from '../constants';
import Setting from '@/lib/models/setting';
import connectDB from '../db';

export const addTrustLine = async () => {
  try {
    const client = new xrpl.Client(XRP_MAINNET_RPC);
    await client.connect();
    await connectDB();
    const setting = await Setting.findOne({});

    if (setting) {
      const wallet = xrpl.Wallet.fromSeed(setting?.tokenPoolWalletSeed);

      const prepared = await client.autofill({
        TransactionType: 'TrustSet',
        Account: wallet.address,
        LimitAmount: {
          currency: LAMBO_TOKEN_CODE,
          issuer: LAMBO_TOKEN_ISSUER,
          value: '1000000000000000000000',
        },
      });

      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      console.log('Transaction result:', result.result.tx_json);

      await client.disconnect();
    }
  } catch (error) {
    console.error('Error adding trust line:', error);
  }
};
