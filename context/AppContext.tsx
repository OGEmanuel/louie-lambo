'use client';

import { Tier, tiers } from '@/lib/constants';
import { AppContextInterface, MineType, StakeType } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

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
  unstake: () => Promise.resolve(false),
  unMine: () => Promise.resolve(false),
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
  holders: 0,
  setHolders: () => {},
  stakedSupply: 0,
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
  const [holders, setHolders] = useState<number>(0);
  const [stakedSupply, setStakedSupply] = useState<number>(0);

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
    const fetchBalance = async (address: string) => {
      await fetchOverview(address);
      if (address) {
        await getActiveStake();
        await getActiveMine();
      }
    };

    // if (walletAddress) {
    fetchBalance(walletAddress);
    // }
  }, [walletAddress]);

  useEffect(() => {
    const tiersList = tiers;

    for (const tier of tiersList) {
      console.log(Number(tokenBalance));
      console.log(
        Number(tokenBalance) <= Number(tier.maximumTokensHeld.toFixed(1)),
      );
      console.log(
        Number(tokenBalance) >= Number(tier.minimumTokensHeld.toFixed(1)),
      );
      if (
        Number(tokenBalance) <= Number(tier.maximumTokensHeld.toFixed(1)) &&
        Number(tokenBalance) >= Number(tier.minimumTokensHeld.toFixed(1))
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
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await payload.json();
      if (!payload.ok) {
        toast.error(data.message, {
          position: 'bottom-right',
        });
        return false;
      }

      setActiveStake(undefined);
      setActiveMine(data.mine);
      toast.success('Successfully unstaked tokens', {
        position: 'bottom-right',
      });
      return true;
    } catch (error) {
      console.error('Error creating stake:', error);

      return false;
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
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // const data = await payload.json();
      if (payload.ok) {
        setActiveMine(undefined);
        toast.success('Successfully withdrawn XRP', {
          position: 'bottom-right',
        });

        return true;
      }
      toast.error('Error claiming XRP', {
        position: 'bottom-right',
      });
      return false;
    } catch (error) {
      console.error('Error creating stake:', error);
      toast.error('Error claiming XRP', {
        position: 'bottom-right',
      });
      return false;
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
          headers: {
            'Content-Type': 'application/json',
          },
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
      // const response = await fetch(
      //   'https://lambo-miner-backend.onrender.com/api/mine/record',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({ address, amount, duration, tier: value.name }),
      //   },
      // );
      const resp = await axios.post(
        `/api/mine/record`,
        { address, amount, duration, tier: value.name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await resp.data;
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
      const resp = await axios.post(
        `/api/stake/record`,
        { address, amount, duration, tier: value.name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await resp.data;
      setActiveStake(data.stake);
      const newTokenBalance = Number(tokenBalance) - amount;
      setTokenBalance(String(newTokenBalance));
      toast.success('Staked tokens✅', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error staking tokens', error);
      toast.error('Error staking tokens', {
        position: 'bottom-right',
      });
      throw new Error('Failed to stake tokens');
    }
  };

  const fetchOverview = async (address: string) => {
    try {
      const response = await fetch(
        `https://lambo-miner-backend.onrender.com/api/users/overview?address=${address}`,
      );
      const data: {
        poolXrpBalance: string;
        stakedWallets: number;
        xrpRewardsDistributed: number;
        userBalance: number;
        tokenBalance: string;
        holders: number;
        stakedSupply: number;
      } = await response.json();

      setPoolXrpBalance(data.poolXrpBalance);
      setStakedWallets(data.stakedWallets);
      setXrpRewardsDistributed(Number(data.xrpRewardsDistributed.toFixed(2)));
      setXrpBalance(Number(data.userBalance.toFixed(2)));
      setTokenBalance(Number(data.tokenBalance).toFixed(2));
      setHolders(data.holders);
      setStakedSupply(data.stakedSupply);
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
        holders,
        setHolders,
        stakedSupply,
      }}
    >
      <ToastContainer position="bottom-right" theme="dark" />

      {children}
    </AppContext.Provider>
  );
};
