import { NextResponse } from 'next/server';
import { XummSdk } from 'xumm-sdk';

export const GET = async () => {
  try {
    const xumm = new XummSdk(
      process.env.XUMM_API_KEY,
      process.env.XUMM_API_SECRET,
    );

    const payload = await xumm.payload.create(
      {
        TransactionType: 'SignIn',
      },
      true,
    );
    return NextResponse.json({ payload: payload }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
