import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import Tier from '@/lib/models/tier';

export async function GET() {
  await connectDB();
  const tiers = await Tier.find();
  return NextResponse.json({ tiers }, { status: 200 });
}
