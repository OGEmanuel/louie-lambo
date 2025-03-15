'use client';

import { Tier, tiers } from '@/lib/constants';
import { AppContextInterface, MineType, StakeType } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export const AppContext = createContext<AppContextInterface>({
  error: '',
  success: '',
  userTier: tiers[0],
  tokenBalance: '0',
  activeStake: undefined,
  activeMine: undefined,
  poolXrpBalance: '',
  stakedWallets: 0,
  xrpRewardsDistributed: 0,
  setError: () => {},
  unstake: () => {},
  unMine: () => {},
  setSuccess: () => {},
  walletAddress: '',
  isMobile: false,
  setWalletAddress: () => {},
  loginUser: () => {},
  createStakeRecord: () => {},
  createMineRecord: () => {},
  setActiveMine: () => {},
  xrpBalance: 0,
  ref: null,
  platform: null,
  setPlatform: () => {},
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [xrpBalance, setXrpBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [poolXrpBalance, setPoolXrpBalance] = useState<string>('0');
  const [stakedWallets, setStakedWallets] = useState<number>(0);
  const [xrpRewardsDistributed, setXrpRewardsDistributed] = useState<number>(0);
  const [value, setValue] = useState<Tier>(tiers[0]);
  const [activeStake, setActiveStake] = useState<StakeType>();
  const [activeMine, setActiveMine] = useState<MineType>();
  const [referrer, setReferrer] = useState<string>('');
  const [platform, setPlatform] = useState<string | null>(null);

  const [cookies] = useCookies(['walley']);
  const params = useSearchParams();
  const refQuery = params.get('ref');

  useEffect(() => {
    sessionStorage.setItem('ref', refQuery ? refQuery : '');
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    if (cookies.walley !== undefined && cookies.walley !== null) {
      const getRef = sessionStorage.getItem('ref');
      setReferrer(getRef ? getRef : '');
      const url = '/api/auth/';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: cookies.walley }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty('address')) {
            setWalletAddress(data.address);
          }
        });
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      await fetchOverview();
      await getActiveStake();
      await getActiveMine();
    };

    if (walletAddress) {
      fetchBalance();
    }
  }, [walletAddress]);

  useEffect(() => {
    const tiersList = tiers;

    for (const tier of tiersList) {
      if (
        tokenBalance >= tier.maximumTokensHeld.toFixed(1) &&
        tokenBalance <= tier.minimumTokensHeld.toFixed(1)
      ) {
        setValue(tier);
      }
    }
  }, [tokenBalance]);

  const unStake = async (amount: number) => {
    try {
      const payload = await fetch(
        'https://lambo-miner-backend.onrender.com/api/stake/unstake',
        {
          method: 'POST',
          body: JSON.stringify({
            address: walletAddress,
            amount: amount,
          }),
        },
      );
      await payload.json();
      setActiveStake(undefined);
      await handleSuccess('successfully unstaked tokens');
    } catch (error) {
      console.error('Error creating stake:', error);
      handleError('Error placing stake');
      throw new Error('Failed to creating stake');
    }
  };

  const unMine = async (amount: number) => {
    try {
      const payload = await fetch(
        'https://lambo-miner-backend.onrender.com/api/mine/withdraw',
        {
          method: 'POST',
          body: JSON.stringify({
            address: walletAddress,
            amount: amount,
          }),
        },
      );
      await payload.json();
      setActiveStake(undefined);
      await handleSuccess('successfully unstaked tokens');
    } catch (error) {
      console.error('Error creating stake:', error);
      handleError('Error placing stake');
      throw new Error('Failed to creating stake');
    }
  };

  // const getXrpBalance = async (address: string): Promise<number> => {
  //   const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);

  //   try {
  //     await xrpClient.connect();

  //     const my_balance = await xrpClient.getXrpBalance(address);
  //     const balanceXrp = my_balance;

  //     return Number(balanceXrp.toFixed(1));
  //   } catch (error) {
  //     console.error('Error fetching balance:', error);
  //     handleError("Couldn't fetch balance");
  //     throw new Error('Failed to fetch XRP balance');
  //   } finally {
  //     await xrpClient?.disconnect();
  //   }
  // };

  const handleSetActiveMine = (mine: MineType) => {
    setActiveMine(mine);
  };

  const getActiveStake = async () => {
    try {
      const response = await fetch(
        `https://lambo-miner-backend.onrender.com/api/stake?address=${walletAddress}`,
      );
      const data: { stake: StakeType } = await response.json();

      setActiveStake(data.stake);
    } catch (error) {
      console.error('Error logging in:', error);
      handleError("Couldn't complete login");
      throw new Error('Failed to login');
    }
  };

  const getActiveMine = async () => {
    try {
      const response = await fetch(
        `https://lambo-miner-backend.onrender.com/api/mine?address=${walletAddress}`,
      );
      const data: { mine: MineType } = await response.json();

      setActiveMine(data.mine);
    } catch (error) {
      console.error('Error logging in:', error);
      handleError("Couldn't get active deposit");
      throw new Error("Couldn't get active deposit");
    }
  };

  const loginUser = async (address: string, platform: string) => {
    try {
      const referrer = sessionStorage.getItem('ref');
      const response = await fetch(
        'https://lambo-miner-backend.onrender.com/api/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({
            address,
            platform,
            referredBy: referrer,
          }),
        },
      );
      await response.json();
      handleSuccess('Login Successful');
    } catch (error) {
      console.error('Error logging in:', error);
      handleError("Couldn't complete login");
      throw new Error('Failed to login');
    }
  };

  const createMineRecord = async (
    address: string,
    amount: number,
    duration: number,
  ) => {
    try {
      const response = await fetch(
        'https://lambo-miner-backend.onrender.com/api/mine/record',
        {
          method: 'POST',
          body: JSON.stringify({ address, amount, duration, tier: value.name }),
        },
      );
      const data = await response.json();
      setActiveMine(data.mine);
      const newTokenBalance = Number(xrpBalance) - amount;
      setXrpBalance(newTokenBalance);
      handleSuccess('Deposited tokens✅');
    } catch (error) {
      console.error('Error depositing tokens', error);
      handleError("Couldn't deposit tokens");
      throw new Error('Failed to stake tokens');
    }
  };

  const createStakeRecord = async (
    address: string,
    amount: number,
    duration: number,
  ) => {
    try {
      const response = await fetch(
        'https://lambo-miner-backend.onrender.com/api/stake/record',
        {
          method: 'POST',
          body: JSON.stringify({ address, amount, duration, tier: value.name }),
        },
      );
      const data = await response.json();
      setActiveStake(data.stake);
      const newTokenBalance = Number(tokenBalance) - amount;
      setTokenBalance(String(newTokenBalance));
      handleSuccess('Staked tokens✅');
    } catch (error) {
      console.error('Error staking tokens', error);
      handleError("Couldn't stake tokens");
      throw new Error('Failed to stake tokens');
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch(
        'https://lambo-miner-backend.onrender.com/api/users/overview',
      );
      const data: {
        poolXrpBalance: string;
        stakedWallets: number;
        xrpRewardsDistributed: number;
        userBalance: number;
        tokenBalance: string;
      } = await response.json();

      setPoolXrpBalance(data.poolXrpBalance);
      setStakedWallets(data.stakedWallets);
      setXrpRewardsDistributed(data.xrpRewardsDistributed);
      setXrpBalance(data.userBalance);
      setTokenBalance(data.tokenBalance);
    } catch (error) {
      console.error('Error fetching overview:', error);
      handleError('Error fetching overview');
      throw new Error('Failed to fetch overview');
    }
  };

  const handleError = (text: string) => {
    setError(text);
    toast.error(text);
    setTimeout(() => {
      setError('');
    }, 4000);
  };

  const handleSuccess = (text: string) => {
    setSuccess(text);
    toast.success(text);
    setTimeout(() => {
      setSuccess('');
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        error,
        success,
        isMobile,
        setWalletAddress,
        poolXrpBalance,
        stakedWallets,
        unstake: unStake,
        userTier: value,
        xrpRewardsDistributed,
        walletAddress,
        activeMine,
        createMineRecord,
        unMine,
        setActiveMine: handleSetActiveMine,
        xrpBalance,
        tokenBalance,
        activeStake,
        setError: handleError,
        loginUser,
        createStakeRecord,
        setSuccess: handleSuccess,
        ref: referrer,
        platform,
        setPlatform,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
