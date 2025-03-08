'use client';

import {
  LAMBO_TOKEN_CODE,
  LAMBO_TOKEN_ISSUER,
  Tier,
  tiers,
  XRP_MAINNET_RPC,
} from '@/lib/constants';
import { AppContextInterface } from '@/lib/types';
import { xrpClient } from '@/lib/xrp/client';
import { getTokenBalance } from '@/lib/xrp/helpers';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import xrpl from 'xrpl';

export const AppContext = createContext<AppContextInterface>({
  error: '',
  success: '',
  userTier: tiers[0],
  tokenBalance: '0',
  poolXrpBalance: '',
  stakedWallets: 0,
  xrpRewardsDistributed: 0,
  setError: () => {},
  setSuccess: () => {},
  walletAddress: '',
  isMobile: false,
  setWalletAddress: () => {},
  loginUser: () => {},
  xrpBalance: 0,
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

  const [cookies] = useCookies(['walley']);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    if (cookies.walley !== undefined && cookies.walley !== null) {
      const url = '/api/auth';
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
      const balance = await getXrpBalance(walletAddress);
      setXrpBalance(balance);
      const tbalance = await getTokenBalance(
        walletAddress,
        LAMBO_TOKEN_ISSUER,
        LAMBO_TOKEN_CODE,
      );
      setTokenBalance(Number(tbalance).toFixed(1));
      await fetchOverview();
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

  const getXrpBalance = async (address: string): Promise<number> => {
    try {
      const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);
      await xrpClient.connect();

      const my_balance = await xrpClient.getXrpBalance(address);
      const balanceXrp = my_balance;

      return Number(balanceXrp.toFixed(1));
    } catch (error) {
      console.error('Error fetching balance:', error);
      handleError("Couldn't fetch balance");
      throw new Error('Failed to fetch XRP balance');
    } finally {
      await xrpClient.disconnect();
    }
  };

  const loginUser = async (address: string, platform: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ address, platform }),
      });
      await response.json();
      handleSuccess('Login Successful');
    } catch (error) {
      console.error('Error logging in:', error);
      handleError("Couldn't complete login");
      throw new Error('Failed to login');
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch('/api/users/overview');
      const data: {
        poolXrpBalance: string;
        stakedWallets: number;
        xrpRewardsDistributed: number;
      } = await response.json();

      setPoolXrpBalance(data.poolXrpBalance);
      setStakedWallets(data.stakedWallets);
      setXrpRewardsDistributed(data.xrpRewardsDistributed);
    } catch (error) {
      console.error('Error fetching overview:', error);
      handleError('Error fetching overview');
      throw new Error('Failed to fetch overview');
    }
  };

  const handleError = (text: string) => {
    setError(text);
    setTimeout(() => {
      setError('');
    }, 10000);
  };

  const handleSuccess = (text: string) => {
    setSuccess(text);
    setTimeout(() => {
      setSuccess('');
    }, 10000);
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
        userTier: value,
        xrpRewardsDistributed,
        walletAddress,
        xrpBalance,
        tokenBalance,
        setError: handleError,
        loginUser,
        setSuccess: handleSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
