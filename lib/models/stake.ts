import mongoose, { Schema, Document } from 'mongoose';

export enum StakeStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  ENDED = 'ended',
}

export interface StakeI extends Document {
  userId: string;
  tier: string;
  tokensAmount: number;
  stakingDurationInDays: number;
  status: string;
  unlockDate: Date;
}

const StakeSchema = new Schema<StakeI>(
  {
    userId: { type: String, required: true },
    tier: { type: String, required: true },
    tokensAmount: { type: Number, required: true },
    stakingDurationInDays: { type: Number, required: true, default: 7 },
    status: { type: String, required: true },
    unlockDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Stake = mongoose.model<StakeI>('Stake', StakeSchema);

export default Stake;
