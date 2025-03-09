import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Stake, { StakeStatus } from '@/lib/models/stake';
import Tier from '@/lib/models/tier';

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { address, amount, duration, tier } = body;

    const user = await User.findOne({ walletAddress: address });
    const tierRec = await Tier.findOne({ name: tier });
    if (!user || !tierRec)
      return NextResponse.json(
        { message: 'could not find user or config' },
        { status: 404 },
      );
    const date = new Date();
    date.setDate(date.getDate() + duration);

    const newStake = await Stake.create({
      user: user.id,
      tier: tierRec.name,
      tokensAmount: amount,
      stakingDurationInDays: duration,
      status: StakeStatus.ACTIVE,
      unlockDate: date,
    });

    return NextResponse.json(
      { message: 'success', stake: newStake },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
