import { XummSdk } from 'xumm-sdk';
const xumm = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

export async function depositXrpWithXumm(
  userAddress: string,
  amount: number,
  poolAddress: string,
) {
  const signRequest = await xumm.payload.create(
    {
      TransactionType: 'Payment',
      Account: userAddress,
      Destination: poolAddress,
      Amount: (amount * 1000000).toString(),
    },
    true,
  );

  if (!signRequest) throw new Error('could  not create payload');
  return signRequest;
}
