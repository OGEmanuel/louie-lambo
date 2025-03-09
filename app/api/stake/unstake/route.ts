import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Config from '@/lib/models/setting';
import { unstakeTokens } from '@/lib/xrp/unStake';
import Stake from '@/lib/models/stake';

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { address, amount } = body;

    const user = await User.findOne({ walletAddress: address });
    const config = await Config.findOne({});
    if (!user || !config)
      return NextResponse.json(
        { message: 'could not find user or config' },
        { status: 404 },
      );
    const stake = await Stake.findOne({ userId: user.id, status: 'ACTIVE' });

    const today = new Date();
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const unlockDateOnly = new Date(
      stake.unlockDate.getFullYear(),
      stake.unlockDate.getMonth(),
      stake.unlockDate.getDate(),
    );

    const isEarly = todayDateOnly < unlockDateOnly;

    if (user.platform === 'xaman') {
      const payload = await unstakeTokens(user.walletAddress, amount, isEarly);
      if (payload) {
        await Stake.updateOne(
          { userId: user.id, status: 'ACTIVE' },
          { $set: { status: 'ENDED' } },
        );
        return NextResponse.json(
          { message: 'unstake successful' },
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
