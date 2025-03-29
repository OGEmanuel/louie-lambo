'use client';

import { Form, FormField } from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  EarlyWithdrawal,
  Summary,
  TransactionDetails,
  UnstakeWarningModal,
} from './tabs';
import { Separator } from '@/components/ui/separator';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

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
});

const UnStake = () => {
  return (
    <div className="flex w-full gap-8 max-xl:flex-col">
      <UnstakeForm tab="unlock" />
      <Summary tab="unlock" />
    </div>
  );
};

export default UnStake;

const UnstakeForm = (props: { tab?: string }) => {
  const appContext = useContext(AppContext);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: appContext.activeStake?.tokensAmount,
    },
  });

  const balance = Number(appContext.activeStake?.tokensAmount);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.amount) {
      setIsloading(true);
      const isSuccess = await appContext.unstake(data.amount);
      if (isSuccess) {
        toast.success('Successfully unstaked tokens', {
          position: 'bottom-right',
        });
      } else {
        toast.error('Error unstaking tokens', {
          position: 'bottom-right',
        });
      }

      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[63.5294117647%] flex-col gap-[46px] rounded-[20px] bg-white p-8 dark:bg-[#1F2029] max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
              description={`Stake Balance: ${balance} LAMBO`}
              field={field}
            />
          )}
        />
        <EarlyWithdrawal tab={props.tab} />
        <Separator className="my-4 bg-[var(--color-stroke)]" />
        <TransactionDetails />
        <UnstakeWarningModal
          open={open}
          setOpen={setOpen}
          onClick={() => form.handleSubmit(onSubmit)()}
          isPending={isLoading}
        >
          <Button variant={'secondary'} className="w-full">
            Eject from your ride
          </Button>
        </UnstakeWarningModal>
      </form>
    </Form>
  );
};
