import { Tier } from './constants';

export interface AppContextInterface {
  walletAddress: string;
  xrpBalance: number;
  userTier: Tier;
  // setUserTier: React.Dispatch<React.SetStateAction<Tier>>;
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
  unstake: (amount: number) => Promise<boolean>;
  unMine: (amount: number) => Promise<boolean>;
  setSuccess: (text: string) => void;
  loginUser: (address: string, platform: string) => void;
  ref: string | null;
  createStakeRecord: (
    address: string,
    amount: number,
    duration: number,
  ) => void;
  createMineRecord: (address: string, amount: number, duration: number) => void;
  setActiveMine: (mine: MineType) => void;
  platform: string | null;
  setPlatform: React.Dispatch<React.SetStateAction<string | null>>;
  holders: number;
  setHolders: React.Dispatch<React.SetStateAction<number>>;
  stakedSupply: number;
  totalSupply: number;
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
  lastClaimDate: string;
  rewardsEarned: number;
  tierData: TierI;
  createdAt: string;
  unlockDate: Date;
  status: string;
};

export interface TierI {
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
