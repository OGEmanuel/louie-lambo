import connectDB from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import Tier from '@/lib/models/tier';

export async function PUT(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const tierId = searchParams.get('tierId');
  const body: {
    oneWeekApy: number;
    twoWeeksApy: number;
    oneMonthApy: number;
    threeMonthsApy: number;
    sixMonthsApy: number;
  } = await req.json();

  const tier = await Tier.updateOne({ _id: tierId }, { ...body });

  return NextResponse.json({ message: 'Tier updated', tier }, { status: 200 });
}
