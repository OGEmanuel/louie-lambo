import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/user';
import Config from '@/lib/models/setting';
import { stakeWithXumm } from '@/lib/xrp/createStake';

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

    if (user.platform === 'xaman') {
      const payload = await stakeWithXumm(
        user.walletAddress,
        amount,
        config.tokenPoolWalletAddress,
      );
      return NextResponse.json({ payload: payload }, { status: 200 });
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
