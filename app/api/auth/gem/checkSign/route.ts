import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import rippleKP from 'ripple-keypairs';

type DecodedToken = {
  public_key: string;
  address: string;
};

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(
      token,
      process.env.ENC_KEY as string,
    ) as DecodedToken;
    const { public_key, address } = decoded;
    const signature = req.nextUrl.searchParams.get('signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Invalid signature format' },
        { status: 400 },
      );
    }

    const tokenHex = Buffer.from(token, 'utf8').toString('hex');
    const isVerified = rippleKP.verify(tokenHex, signature, public_key);

    if (isVerified) {
      const newToken = jwt.sign(
        { xrpAddress: address },
        process.env.ENC_KEY as string,
      );
      return NextResponse.json({ token: newToken, address }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Signature not verified' },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, line: (error as Error).stack },
      { status: 400 },
    );
  }
}
