import { Tier } from './constants';

export interface AppContextInterface {
  walletAddress: string;
  xrpBalance: number;
  userTier: Tier;
  tokenBalance: string;
  poolXrpBalance: string;
  stakedWallets: number;
  xrpRewardsDistributed: number;
  error: string;
  success: string;
  isMobile: boolean;
  activeStake: StakeType | undefined;
  activeMine: MineType | undefined;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setError: (text: string) => void;
  unstake: (amount: number) => void;
  unMine: (amount: number) => void;
  setSuccess: (text: string) => void;
  loginUser: (address: string, platform: string) => void;
  ref: string | null;
  createStakeRecord: (
    address: string,
    amount: number,
    duration: number,
  ) => void;
  createMineRecord: (address: string, amount: number, duration: number) => void;
}

export type StakeType = {
  userId: string;
  tier: string;
  tokensAmount: number;
  stakingDurationInDays: number;
  status: string;
  unlockDate: Date;
};

export type MineType = {
  user: string;
  tier: string;
  stake: string;
  tokensAmount: number;
  stakingDurationInDays: number;
  expectedAmount: number;
  rewardsEarned: number;
  createdAt: string;
  unlockDate: Date;
  status: string;
};
