'use client';

// import { ButtonLoading } from '@/components/ui/button-loading';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Copy } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import comingSoon from '@/public/images/coming-soon.png';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

export const Referral = () => {
  const appContext = useContext(AppContext);
  const [, setOrigin] = useState('');

  // function truncateString(value: string): string {
  //   if (value.length <= 12) return value;
  //   return `${value.slice(0, 6)}.....${value.slice(-6)}`;
  // }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (appContext.error) {
      toast.error(appContext.error, {
        position: 'bottom-right',
      });
    } else if (appContext.success) {
      toast.success(appContext.success, {
        position: 'bottom-right',
      });
    }
  }, [appContext.error, appContext.success]);

  // function copyToClipboard(text: string) {
  //   if (typeof navigator !== 'undefined' && navigator.clipboard) {
  //     navigator.clipboard.writeText(text).then(
  //       () => {
  //         toast.success('Copied to clipboard', {
  //           position: 'bottom-right',
  //         });
  //       },
  //       err => {
  //         toast.error(err.message, {
  //           position: 'bottom-right',
  //         });
  //       },
  //     );
  //   } else {
  //     toast.error('Failed to copy to clipboard', {
  //       position: 'bottom-right',
  //     });
  //   }
  // }

  return (
    <>
      <div className="flex flex-col gap-[2.63rem]">
        <div className="flex flex-col gap-[7px] text-center">
          <p className="text-2xl leading-[31.25px] text-[var(--color-black)]">
            Refer & Earn
          </p>
          <p className="leading-[100%] text-[var(--color-gray)] dark:text-white">
            Earn free XRP bonus from referrals
          </p>
        </div>
        <div className="flex flex-col items-center gap-[0.89rem]">
          <p className="text-xl leading-[100%] text-[var(--text-black)]">
            Coming soon!
          </p>
          <Image src={comingSoon} alt="coming soon" />
        </div>
      </div>
    </>
  );
};
