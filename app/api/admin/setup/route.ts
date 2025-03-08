import { NextResponse } from 'next/server';
import { tiers } from '@/lib/constants';
import Tier from '@/lib/models/tier';
import Settings from '@/lib/models/setting';
import connectDB from '@/lib/db';
import { createWallet } from '@/lib/xrp/helpers';

export async function POST() {
  await connectDB();

  for (const tier of tiers) {
    const tierExists = await Tier.findOne({ name: tier.name });
    if (tierExists) continue;

    await Tier.create({
      name: tier.name,
      description: tier.description,
      minimumTokensHeld: tier.minimumTokensHeld,
      maximumTokensHeld: tier.maximumTokensHeld,
      oneWeekApy: tier.oneWeekApy,
      twoWeeksApy: tier.twoWeeksApy,
      oneMonthApy: tier.oneMonthApy,
      threeMonthsApy: tier.threeMonthsApy,
      sixMonthsApy: tier.sixMonthsApy,
      maxXrpMineable: tier.maxXrpMineable,
    });
  }

  const settingsExist = await Settings.findOne({});
  if (settingsExist)
    return NextResponse.json(
      { message: 'settings already exists' },
      { status: 400 },
    );

  const xrpWallet = await createWallet();
  const tokensWallet = await createWallet();
  await Settings.create({
    name: 'Lambo Louie',
    xrpPoolWalletAddress: xrpWallet.address,
    xrpPoolWalletSeed: xrpWallet.seed,
    tokenPoolWalletAddress: tokensWallet.address,
    tokenPoolWalletSeed: tokensWallet.seed,
  });
  return NextResponse.json({ success: true }, { status: 201 });
}
