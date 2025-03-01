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
      <Summary tab="stake" />
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

  const balance = 25;

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
        className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8 max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
              description={`Balance: ${balance} XRP`}
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <RadioInput
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
        <div className="flex items-center justify-between text-[var(--text-black)]">
          <p className="text-lg leading-[23.44px] max-lg:text-sm max-lg:leading-[18.23px]">
            {'How much you’ll get'}
          </p>
          <p className="text-xl font-medium leading-[26.04px] max-lg:text-base max-lg:leading-[20.83px]">
            $250 LAMBO
          </p>
        </div>
        <Separator className="my-4 bg-[var(--color-stroke)]" />
        <TransactionDetails />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label="Stake LAMBO"
          isPending={false}
        />
      </form>
    </Form>
  );
};
