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
    const date = new Date();
    date.setDate(date.getDate() + duration);

    let perc;

    if (duration === 7) perc = tier.oneWeekApy;
    else if (duration === 14) perc = tier.twoWeeksApy;
    else if (duration === 30) perc = tier.oneMonthApy;
    else if (duration === 60) perc = tier.threeMonthsApy;
    else if (duration === 90) perc = tier.sixMonthsApy;
    else perc = 0;

    const expectedAmount = amount + perc * amount;

    const newMine = await Mine.create({
      user: user._id,
      tier: tier._id,
      stake: stake._id,
      tokensAmount: amount,
      stakingDurationInDays: duration,
      expectedAmount,
      unlockDate: date,
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
