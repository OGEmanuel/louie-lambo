import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import Setting from '@/lib/models/setting';
import xrpl from 'xrpl';
import { XRP_MAINNET_RPC } from '@/lib/constants';
import User from '@/lib/models/user';
import Mine from '@/lib/models/mine';

export async function GET() {
  await connectDB();
  const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);
  await xrpClient.connect();

  const setting = await Setting.findOne({});
  if (!setting)
    return NextResponse.json(
      { message: 'settings not found' },
      { status: 400 },
    );

  const my_balance = await xrpClient.getXrpBalance(
    setting.xrpPoolWalletAddress,
  );
  const poolXrpBalance = my_balance.toFixed(1);

  const stakedWallets = await User.find({ staked: true });
  const allMines = await Mine.find({});
  const allMineRewards = allMines.reduce((a, b) => a + b.rewardsEarned, 0);

  const response = {
    poolXrpBalance,
    stakedWallets: stakedWallets.length,
    xrpRewardsDistributed: allMineRewards,
  };

  return NextResponse.json({ ...response }, { status: 200 });
}
