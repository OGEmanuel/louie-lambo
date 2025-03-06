import { NextRequest, NextResponse } from 'next/server';
import { XummSdk } from 'xumm-sdk';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const payloadId = searchParams.get('payloadId');

    if (!payloadId) {
      return NextResponse.json(
        { error: 'Missing payloadId parameter' },
        { status: 400 },
      );
    }

    const xumm = new XummSdk(
      process.env.XUMM_API_KEY as string,
      process.env.XUMM_API_SECRET as string,
    );

    const payload = await xumm.payload.get(payloadId);

    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
