import mongoose, { Schema, Document } from 'mongoose';

interface ISettings extends Document {
  name: string;
  xrpPoolWalletAddress: string;
  tokenPoolWalletAddress: string;
  xrpPoolWalletSeed: string;
  tokenPoolWalletSeed: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    name: {
      type: String,
      required: true,
    },
    xrpPoolWalletAddress: {
      type: String,
      required: true,
    },
    xrpPoolWalletSeed: {
      type: String,
      required: true,
    },
    tokenPoolWalletAddress: {
      type: String,
      required: true,
    },
    tokenPoolWalletSeed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>('Settings', settingsSchema);

export default Settings;
