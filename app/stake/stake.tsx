'use client';

import { Form, FormField } from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import RadioInput from '@/components/ui/radio-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TransactionDetails from './transaction-details';
import { ButtonLoading } from '@/components/ui/button-loading';
import { Summary } from './tabs';

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
    <div className="flex w-full gap-8">
      <StakeForm />
      <Summary tab="stake" />
      {/* <StakeSummary /> */}
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
        className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8"
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
        <p className="rounded-lg bg-[var(--color-bg)] px-[10px] py-[11px] leading-[20.83px] text-[var(--color-black)]">
          Early withdrawal will result in{' '}
          <span className="font-medium">50%</span> loss of staked $LAMBO tokens
        </p>
        <hr className="border border-[var(--color-stroke)]" />
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

const StakeSummary = () => {
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] rounded-[20px] bg-white p-12">
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <p className="leading-[20.83px]">Annual percentage profit (APY rate)</p>
        <p className="text-[28px] leading-[36.46px]">4.33%</p>
      </div>
      <div className="flex w-full max-w-[217px] flex-col gap-7 self-center text-center">
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-[23.44px] text-[var(--color-gray)]">
            Current tier
          </p>
          <p className="text-2xl font-medium leading-[31.25px]">Tier 1</p>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-[23.44px] text-[var(--color-gray)]">
            $LAMBO supply
          </p>
          <p className="text-2xl font-medium leading-[31.25px]">1B</p>
        </div>
      </div>
    </div>
  );
};
