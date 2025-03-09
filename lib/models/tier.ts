import mongoose, { Schema, Document } from 'mongoose';

export interface TierI extends Document {
  name: string;
  description: string;
  minimumTokensHeld: number;
  maximumTokensHeld: number;
  oneWeekApy: number;
  twoWeeksApy: number;
  oneMonthApy: number;
  threeMonthsApy: number;
  sixMonthsApy: number;
  maxXrpMineable: number;
}

const TierSchema = new Schema<TierI>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    oneWeekApy: {
      type: Number,
      required: true,
    },
    twoWeeksApy: {
      type: Number,
      required: true,
    },
    oneMonthApy: {
      type: Number,
      required: true,
    },
    threeMonthsApy: {
      type: Number,
      required: true,
    },
    sixMonthsApy: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Tier = mongoose.models.Tier || mongoose.model<TierI>('Tier', TierSchema);

export default Tier;
