'use client';

import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NumberInput from '@/components/ui/number-input';
import { useForm } from 'react-hook-form';
import { ButtonLoading } from '@/components/ui/button-loading';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { getDurationInDays } from '@/lib/utils';
import RadioInput from '@/components/ui/radio-input';
import WalletScanDrawer from '@/components/walletScanDrawer';

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

const MinerForm = (props: {
  type: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const convertedDuration: string = 'oneWeek';
  const appContext = useContext(AppContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      duration: convertedDuration,
    },
  });
  const [qrcode, setQrcode] = useState<string>('');
  const [jumpLink, setJumpLink] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const getAPY = (): number => {
    return convertedDuration === 'oneWeek'
      ? appContext.userTier?.oneWeekApy
      : convertedDuration === 'twoWeeks'
        ? appContext.userTier?.twoWeeksApy
        : convertedDuration === 'oneMonth'
          ? appContext.userTier?.oneMonthApy
          : convertedDuration === 'threeMonths'
            ? appContext.userTier?.threeMonthsApy
            : appContext.userTier?.sixMonthsApy;
  };

  const balance = appContext.xrpBalance;

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
        'https://lambo-miner-backend.onrender.com/api/mine/create',
        {
          method: 'POST',
          body: JSON.stringify({
            address: appContext.walletAddress,
            amount: amount,
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
          await appContext.createMineRecord(
            appContext.walletAddress,
            amount,
            duration,
          );
          setDrawerOpen(false);
          props.setIsSuccess(true);
        }
      };
    } catch (error) {
      console.error('Error depositing xrp:', error);
      appContext.setError('Error placing stake');
      throw new Error('Failed to creating stake');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[46px] max-lg:space-y-6"
      >
        <TransactionDetails
          balance={balance}
          xrpBalance={appContext.xrpBalance}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
              description={`Projected yield: APY ${getAPY()}%`}
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          disabled={appContext.activeStake ? true : false}
          name="duration"
          render={({ field }) => (
            <RadioInput
              label="Duration"
              field={field}
              disabled={true}
              options={[
                { label: '7 days', value: 'oneWeek' },
                { label: '1 month', value: 'oneMonth' },
                { label: '3 months', value: 'threeMonths' },
                { label: '6 months', value: 'sixMonths' },
              ]}
              onChange={() => {
                field.onChange(convertedDuration);
              }}
            />
          )}
        />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label={`${props.type} XRP`}
          isPending={isLoading}
          disabled={appContext.activeMine?.status === 'ACTIVE' || isLoading}
        />
        <WalletScanDrawer
          drawerOpen={drawerOpen}
          jumpLink={jumpLink}
          qrcode={qrcode}
          setDrawerOpen={setDrawerOpen}
        />
      </form>
    </Form>
  );
};

export const MinerFormWithdraw = (props: {
  type: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const appContext = useContext(AppContext);

  const getAPY = (): number => {
    return appContext.activeMine?.stakingDurationInDays === 7
      ? appContext.userTier?.oneWeekApy
      : appContext.activeMine?.stakingDurationInDays === 30
        ? appContext.userTier?.oneMonthApy
        : appContext.activeMine?.stakingDurationInDays === 90
          ? appContext.userTier?.threeMonthsApy
          : appContext.userTier?.sixMonthsApy;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: appContext.activeMine?.tokensAmount,
      duration: '22888',
    },
  });
  const [isLoading, setIsloading] = useState<boolean>(false);

  const balance = appContext.activeMine!.tokensAmount;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.amount);
    if (data.amount) {
      setIsloading(true);
      await appContext.unMine(data.amount);
      props.setIsSuccess(true);
      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[46px] max-lg:space-y-6"
      >
        <TransactionDetails
          balance={balance}
          xrpBalance={appContext.xrpBalance}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
              description={`Projected yield: APY ${getAPY()}%`}
              field={field}
            />
          )}
        />

        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label={`${props.type} XRP`}
          isPending={isLoading}
          disabled={isLoading}
        />
      </form>
    </Form>
  );
};

export default MinerForm;

const TransactionDetails = (props: { balance: number; xrpBalance: number }) => {
  return (
    <div className="flex flex-col gap-6 leading-[20.83px] max-lg:text-sm max-lg:leading-[18.23px]">
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Balance</p>
        <p className="font-medium">{props.xrpBalance} XRP</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Deposited XRP Balance</p>
        <p className="font-medium">{props.balance} XRP</p>
      </div>
      {/* <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Deposited</p>
        <p className="font-medium">28 XR P</p>
      </div> */}
    </div>
  );
};
