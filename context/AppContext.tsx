'use client';

import { XRP_MAINNET_RPC } from '@/lib/constants';
import { AppContextInterface } from '@/lib/types';
import { xrpClient } from '@/lib/xrp/client';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import xrpl from 'xrpl';

export const AppContext = createContext<AppContextInterface>({
  error: '',
  success: '',
  setError: () => {},
  setSuccess: () => {},
  walletAddress: '',
  isMobile: false,
  setWalletAddress: () => {},
  xrpBalance: 0,
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [xrpBalance, setXrpBalance] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
    };

    console.log('calling fetch');
    console.log(walletAddress);
    fetchBalance();
  }, [walletAddress]);

  const getXrpBalance = async (address: string): Promise<number> => {
    try {
      const xrpClient = new xrpl.Client(XRP_MAINNET_RPC);
      await xrpClient.connect();

      const my_balance = await xrpClient.getXrpBalance(address);
      const balanceXrp = my_balance;

      return Number(balanceXrp.toFixed(1));
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch XRP balance');
    } finally {
      await xrpClient.disconnect();
    }
  };

  const handleError = (text: string) => {
    setError(text);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const handleSuccess = (text: string) => {
    setSuccess(text);
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        error,
        success,
        isMobile,
        setWalletAddress,
        walletAddress,
        xrpBalance,
        setError: handleError,
        setSuccess: handleSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
