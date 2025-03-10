import mongoose, { Schema, Document } from 'mongoose';

export interface MineI extends Document {
  user: string;
  tier: string;
  stake: string;
  tokensAmount: number;
  stakingDurationInDays: number;
  expectedAmount: number;
  rewardsEarned: number;
  unlockDate: Date;
  status: string;
}

const MineSchema = new Schema<MineI>(
  {
    user: { type: String, required: true },
    tier: { type: String, required: true },
    stake: { type: String, required: true },
    tokensAmount: { type: Number, required: true },
    stakingDurationInDays: { type: Number, required: true, default: 7 },
    expectedAmount: { type: Number, required: true },
    rewardsEarned: { type: Number, default: 0 },
    status: { type: String, required: true },
    unlockDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Mine = mongoose.models.Mine || mongoose.model<MineI>('Mine', MineSchema);

export default Mine;
