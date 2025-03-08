import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/user';
import connectDB from '@/lib/db';

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const address = body.address;
  const user = await User.findOne({ address });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await User.updateOne({ address }, { rewardsRevoked: true });
  return NextResponse.json({ message: 'Reward revoked' }, { status: 200 });
}
