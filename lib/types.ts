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
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setError: (text: string) => void;
  setSuccess: (text: string) => void;
  loginUser: (address: string, platform: string) => void;
}
