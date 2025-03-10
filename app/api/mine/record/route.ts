import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Stake from '@/lib/models/stake';
import Mine from '@/lib/models/mine';
import Tier from '@/lib/models/tier';

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { address, amount, duration, tier } = body;

    const user = await User.findOne({ walletAddress: address });
    const tierRec = await Tier.findOne({ name: tier });
    const stake = await Stake.findOne({ userId: user.id, status: 'ACTIVE' });
    if (!user || !tierRec)
      return NextResponse.json(
        { message: 'could not find user or config' },
        { status: 404 },
      );

    console.log(tierRec.oneWeekApy);
    const perc: number =
      duration === 7
        ? tierRec.oneWeekApy
        : duration == 14
          ? tierRec.twoWeeksApy
          : duration == 30
            ? tierRec.oneMonthApy
            : duration == 60
              ? tierRec.threeMonthsApy
              : duration == 90
                ? tierRec.sixMonthsApy
                : 0;
    const date = new Date();
    date.setDate(date.getDate() + duration);

    console.log(perc);
    const expectedAmount: number =
      Number(amount) + Number(perc) * Number(amount);
    console.log(expectedAmount);

    const newMine = await Mine.create({
      user: user.id,
      tier: tierRec.id,
      stake: stake.id,
      tokensAmount: amount,
      stakingDurationInDays: duration,
      expectedAmount,
      unlockDate: date,
      status: 'ACTIVE',
      rewardsEarned: 0,
    });

    return NextResponse.json(
      { message: 'success', mine: newMine },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
