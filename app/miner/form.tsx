'use client';

import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NumberInput from '@/components/ui/number-input';
import { useForm } from 'react-hook-form';
import { ButtonLoading } from '@/components/ui/button-loading';
import { Dispatch, SetStateAction } from 'react';

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

const MinerForm = (props: {
  type: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const balance = 280;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>;
    props.setIsSuccess(true);
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[46px] max-lg:space-y-6"
      >
        <TransactionDetails balance={balance} />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
              description={`Projected yield: APY 4.5%`}
              field={field}
            />
          )}
        />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label={`${props.type} XRP`}
          isPending={false}
        />
      </form>
    </Form>
  );
};

export default MinerForm;

const TransactionDetails = (props: { balance: number }) => {
  return (
    <div className="flex flex-col gap-6 leading-[20.83px] max-lg:text-sm max-lg:leading-[18.23px]">
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Balance</p>
        <p className="font-medium">{props.balance} XRP</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Deposited</p>
        <p className="font-medium">28 XRP</p>
      </div>
    </div>
  );
};
