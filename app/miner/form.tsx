import { Form, FormField, useFormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TransactionDetails from './transaction-details';
import NumberInput from '@/components/ui/number-input';
import { useForm } from 'react-hook-form';
import { ButtonLoading } from '@/components/ui/button-loading';
import HowItWorks from './how-it-works';

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

const MinerForm = (props: { type: string }) => {
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
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8"
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
        <hr className="border border-[var(--color-stroke)]" />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label={`${props.type} XRP`}
          isPending={false}
        />
        <HowItWorks />
      </form>
    </Form>
  );
};

export default MinerForm;
