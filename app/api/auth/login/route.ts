import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/user';
import connectDB from '@/lib/db';

export const POST = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();
  const { address, platform } = body;

  if (!address || !platform) {
    return NextResponse.json(
      { error: 'Missing address or platform' },
      { status: 400 },
    );
  }

  const userExists = await User.findOne({ walletAddress: address });
  if (userExists) {
    return NextResponse.json({ user: userExists }, { status: 200 });
  }

  const newUser = await User.create({
    walletAddress: address,
    platform,
    tier: 'tier 1',
  });

  return NextResponse.json({ user: newUser }, { status: 201 });
};
