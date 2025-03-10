import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { pubkey, address } = await req.json();
    const token = jwt.sign(
      { public_key: pubkey, address: address },
      process.env.ENC_KEY as string,
      { expiresIn: '1h' },
    );
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
