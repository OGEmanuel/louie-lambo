import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface MineI extends Document {
  user: ObjectId;
  tier: ObjectId;
  stake: ObjectId;
  tokensAmount: number;
  stakingDurationInDays: number;
  expectedAmount: number;
  rewardsEarned: number;
  unlockDate: Date;
  status: string;
}

const MineSchema = new Schema<MineI>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tier: { type: Schema.Types.ObjectId, ref: 'Tier', required: true },
    stake: { type: Schema.Types.ObjectId, ref: 'Stake', required: true },
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
