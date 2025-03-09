import { NextRequest, NextResponse } from 'next/server';
import Stake from '@/lib/models/stake';
import User from '@/lib/models/user';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const user = await User.findOne({ walletAddress: address });

    if (!address || !user) {
      return NextResponse.json(
        { error: 'invalid address parameter' },
        { status: 404 },
      );
    }

    const stakeExists = await Stake.findOne({ userId: user.id });

    return NextResponse.json({ stake: stakeExists }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
