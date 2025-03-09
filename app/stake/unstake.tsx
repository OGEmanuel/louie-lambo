'use client';

import { Form, FormField } from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ButtonLoading } from '@/components/ui/button-loading';
import { EarlyWithdrawal, Summary, TransactionDetails } from './tabs';
import { Separator } from '@/components/ui/separator';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

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
      <UnstakeForm />
      <Summary tab="unstake" />
    </div>
  );
};

export default UnStake;

const UnstakeForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const appContext = useContext(AppContext);

  const balance = Number(appContext.activeStake?.tokensAmount);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>;
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none"
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
        <EarlyWithdrawal />
        <Separator className="my-4 bg-[var(--color-stroke)]" />
        <TransactionDetails />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label="Unstake LAMBO"
          isPending={false}
        />
      </form>
    </Form>
  );
};
