export interface AppContextInterface {
  walletAddress: string;
  xrpBalance: number;
  tokenBalance: string;
  error: string;
  success: string;
  isMobile: boolean;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setError: (text: string) => void;
  setSuccess: (text: string) => void;
  loginUser: (address: string, platform: string) => void;
}
