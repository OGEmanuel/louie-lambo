import { NextRequest, NextResponse } from 'next/server';
import { verifySignature } from 'verify-xrpl-signature';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hex = searchParams.get('hex');

    if (!hex) {
      return NextResponse.json(
        { error: 'Missing hex parameter' },
        { status: 400 },
      );
    }

    const resp = verifySignature(hex);

    if (resp.signatureValid === true) {
      const xrpAddress = resp.signedBy;
      const encrypted = jwt.sign(
        { address: xrpAddress },
        process.env.ENC_KEY as string,
      );

      return NextResponse.json(
        { xrpAddress, token: encrypted },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
