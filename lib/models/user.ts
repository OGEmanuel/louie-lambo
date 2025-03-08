import mongoose, { Schema, Document } from 'mongoose';

export interface UserI extends Document {
  walletAddress: string;
  tier: string;
  platform: string;
  staked: boolean;
  mined: boolean;
  referredBy: string;
  rewardsRevoked: boolean;
}

const UserSchema = new Schema<UserI>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    tier: {
      type: String,
      required: true,
    },
    staked: {
      type: Boolean,
      default: false,
    },
    mined: {
      type: Boolean,
      default: false,
    },
    platform: {
      type: String,
      required: true,
      default: 'lambo',
    },
    referredBy: {
      type: String,
      default: '',
    },
    rewardsRevoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<UserI>('User', UserSchema);

export default User;
