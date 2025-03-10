import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Config from '@/lib/models/setting';
import Mine from '@/lib/models/mine';
import { calculateStakeRewards } from '@/lib/utils';

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { address } = body;

    const user = await User.findOne({ walletAddress: address });
    const config = await Config.findOne({});
    if (!user || !config)
      return NextResponse.json(
        { message: 'could not find user or config' },
        { status: 404 },
      );
    const mine = await Mine.findOne({ user: user._id, status: 'ACTIVE' });

    const rewards =
      calculateStakeRewards(
        mine.tokensAmount,
        200,
        mine.stakingDurationInDays,
        mine.createdAt,
        new Date(),
      ) + mine.tokensAmount;

    await Mine.updateOne(
      { user: user._id, status: 'ACTIVE' },
      { tokensAmount: rewards },
    );

    return NextResponse.json(
      { message: 'rewards added to stake' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
