import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Config from '@/lib/models/setting';
import { withdrawToken } from '@/lib/xrp/unStake';
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

    if (user.platform === 'xaman') {
      const rewards = calculateStakeRewards(
        mine.tokensAmount,
        200,
        mine.stakingDurationInDays,
        mine.createdAt,
        new Date(),
      );

      const payload = await withdrawToken(user.walletAddress, rewards);
      if (payload) {
        await Mine.updateOne(
          { userId: user._id, status: 'ACTIVE' },
          { $set: { status: 'ENDED' } },
        );
        return NextResponse.json(
          { message: 'withdrawal successful' },
          { status: 200 },
        );
      }
    }

    return NextResponse.json(
      { message: 'wallet not supported yet' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
