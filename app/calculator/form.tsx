import { ButtonLoading } from '@/components/ui/button-loading';
import { Form, FormField } from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import RadioInput from '@/components/ui/radio-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const CalculatorForm = () => {
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
        <p className="text-2xl leading-[31.25px] text-[var(--color-black)]">
          Estimate your returns
        </p>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', balance)}
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
              description="Projected yield: APY 4.5%"
              options={[
                { label: '7 days', value: '7-days' },
                { label: '14 days', value: '14-days' },
                { label: '1 month', value: '1-month' },
                { label: '3 months', value: '3-months' },
                { label: '6 months', value: '6-months' },
              ]}
              field={field}
            />
          )}
        />
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label="Calculate rewards"
          isPending={false}
        />
      </form>
    </Form>
  );
};

export default CalculatorForm;
