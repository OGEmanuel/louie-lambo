'use client';

import { Form, FormField } from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import RadioInput from '@/components/ui/radio-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ButtonLoading } from '@/components/ui/button-loading';
import { EarlyWithdrawal, Summary, TransactionDetails } from './tabs';
import { Separator } from '@/components/ui/separator';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import WalletScanDrawer from '@/components/walletScanDrawer';
import { getDurationInDays } from '@/lib/utils';

const FormSchema = z.object({
  amount: z
    .union([
      z
        .string()
        .refine(
          val =>
            val.trim() === '' ||
            (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
          {
            message: 'Amount must be a number greater than 0',
          },
        ),
      z.number().positive('Amount must be greater than 0'),
    ])
    .transform(val => {
      if (typeof val === 'string') {
        return val.trim() === '' ? undefined : parseFloat(val);
      }
      return val;
    }),
  duration: z.string().min(2, {
    message: 'Duration must be at least 2 characters.',
  }),
});

const Stake = () => {
  return (
    <div className="flex w-full gap-8 max-xl:flex-col">
      <StakeForm />
    </div>
  );
};

export default Stake;

const StakeForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      duration: '14-days',
    },
  });
  const [qrcode, setQrcode] = useState<string>('');
  const [jumpLink, setJumpLink] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const appContext = useContext(AppContext);

  const balance = appContext.tokenBalance;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.amount && data.duration) {
      await createStake(data.amount, getDurationInDays(data.duration));
    }
  }
  const createStake = async (amount: number, duration: number) => {
    try {
      setIsloading(true);
      setDrawerOpen(open => !open);
      const payload = await fetch(
        'https://lambo-miner-backend.onrender.com/api/stake/create',
        {
          method: 'POST',
          body: JSON.stringify({
            address: appContext.walletAddress,
            amount: amount,
            duration: duration,
            tier: appContext.userTier.name,
          }),
        },
      );
      const data = await payload.json();

      setQrcode(data.payload.refs.qr_png);
      setJumpLink(data.payload.next.always);

      if (appContext.isMobile) {
        window.open(data.payload.next.always, '_blank');
      }

      const ws = new WebSocket(data.payload.refs.websocket_status);

      ws.onmessage = async e => {
        const responseObj = JSON.parse(e.data);
        if (responseObj.signed !== null && responseObj.signed !== undefined) {
          const payload = await fetch(
            `https://lambo-miner-backend.onrender.com/api/auth/xumm/getPayload?payloadId=${responseObj.payload_uuidv4}`,
          );
          const payloadJson = await payload.json();
          const hex = payloadJson.payload.response.hex;
          const checkSign = await fetch(
            `https://lambo-miner-backend.onrender.com/api/auth/xumm/checkSign?hex=${hex}`,
          );
          await checkSign.json();
          await appContext.createStakeRecord(
            appContext.walletAddress,
            amount,
            duration,
          );
          form.setValue('amount', 0);
          setDrawerOpen(false);
        }
      };
    } catch (error) {
      console.error('Error creating stake:', error);
      appContext.setError('Error placing stake');
      throw new Error('Failed to creating stake');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none"
        >
          <FormField
            control={form.control}
            disabled={appContext.activeStake?.status == 'ACTIVE'}
            name="amount"
            render={({ field }) => (
              <NumberInput
                label="Amount"
                onSetMax={() =>
                  form.setValue('amount', Math.round(Number(balance) - 10))
                }
                description={`Balance: ${balance} LAMBO`}
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            disabled={appContext.activeStake?.status == 'ACTIVE'}
            name="duration"
            render={({ field }) => (
              <RadioInput
                disabled={appContext.activeStake?.status == 'ACTIVE'}
                label="Duration"
                field={field}
                options={[
                  { label: '7 days', value: '7-days' },
                  { label: '14 days', value: '14-days' },
                  { label: '1 month', value: '1-month' },
                  { label: '3 months', value: '3-months' },
                  { label: '6 months', value: '6-months' },
                ]}
              />
            )}
          />
          <EarlyWithdrawal />
          {/* <div className="flex items-center justify-between text-[var(--text-black)]">
            <p className="text-lg leading-[23.44px] max-lg:text-sm max-lg:leading-[18.23px]">
              {'How much you’ll get'}
            </p>
            <p className="text-xl font-medium leading-[26.04px] max-lg:text-base max-lg:leading-[20.83px]">
              $250 LAMBO
            </p>
          </div> */}
          <Separator className="my-4 bg-[var(--color-stroke)]" />
          <TransactionDetails />
          <ButtonLoading
            className="w-full"
            variant={'secondary'}
            type="submit"
            label="Stake LAMBO"
            isPending={isLoading}
            disabled={appContext.activeStake?.status == 'ACTIVE' || isLoading}
          />
          <WalletScanDrawer
            drawerOpen={drawerOpen}
            jumpLink={jumpLink}
            qrcode={qrcode}
            setDrawerOpen={setDrawerOpen}
          />
        </form>
      </Form>
      <Summary tab="stake" />
    </>
  );
};
