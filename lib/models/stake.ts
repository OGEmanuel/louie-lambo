import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface StakeI extends Document {
  user: ObjectId;
  tier: ObjectId;
  tokensAmount: number;
  stakingDurationInDays: number;
  unlockDate: Date;
}

const StakeSchema = new Schema<StakeI>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tier: { type: Schema.Types.ObjectId, ref: 'Tier', required: true },
    tokensAmount: { type: Number, required: true },
    stakingDurationInDays: { type: Number, required: true, default: 7 },
    unlockDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Stake = mongoose.model<StakeI>('Stake', StakeSchema);

export default Stake;
