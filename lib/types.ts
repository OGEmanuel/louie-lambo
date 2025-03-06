export interface AppContextInterface {
  walletAddress: string;
  xrpBalance: number;
  error: string;
  success: string;
  isMobile: boolean;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setError: (text: string) => void;
  setSuccess: (text: string) => void;
}
