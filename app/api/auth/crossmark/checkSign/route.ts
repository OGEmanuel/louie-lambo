import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import rippleKP from 'ripple-keypairs';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const signature = searchParams.get('signature');

    const { pubkey: public_key, address } = await req.json();

    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isVerified = rippleKP.verify(token, signature!, public_key);
    if (isVerified) {
      const newToken = jwt.sign({ xrpAddress: address }, process.env.ENC_KEY!);

      return new Response(
        JSON.stringify({ token: newToken, xrpAddress: address }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } else {
      return new Response(JSON.stringify({ error: 'Signature not verified' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: (error as Error).message,
        line: (error as Error).stack,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
