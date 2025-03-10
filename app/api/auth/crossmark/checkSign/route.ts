import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import rippleKP from 'ripple-keypairs';

export async function POST(req: NextRequest) {
  try {
    const { pubkey: public_key, address, signature, token } = await req.json();

    const isVerified = rippleKP.verify(token, signature, public_key);

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
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
