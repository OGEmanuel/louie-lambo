import { XummSdk } from 'xumm-sdk';
import { LAMBO_TOKEN_CODE, LAMBO_TOKEN_ISSUER } from '../constants';

const xumm = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

export async function stakeWithXumm(
  userAddress: string,
  amount: number,
  poolAddress: string,
) {
  const signRequest = await xumm.payload.create(
    {
      TransactionType: 'Payment',
      Account: userAddress,
      Destination: poolAddress,
      Amount: {
        currency: LAMBO_TOKEN_CODE,
        value: amount.toFixed(6),
        issuer: LAMBO_TOKEN_ISSUER,
      },
    },
    true,
  );

  if (!signRequest) throw new Error('could not create payload');
  return signRequest;
}
