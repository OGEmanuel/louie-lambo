'use client';

import { ButtonLoading } from '@/components/ui/button-loading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import NumberInput from '@/components/ui/number-input';
import RadioInput from '@/components/ui/radio-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
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
  duration: z.string().min(2, {
    message: 'Duration must be at least 2 characters.',
  }),
  tier: z.string().min(1, {
    message: 'Tier must be at least 1 character.',
  }),
});

type Tier = {
  _id: string;
  name: string;
  description: string;
  oneWeekApy: number;
  twoWeeksApy: number;
  oneMonthApy: number;
  threeMonthsApy: number;
  sixMonthsApy: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

const CalculatorForm = () => {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await axios.get('/api/admin/getTiers');
        setTiers(response.data.tiers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTiers();
  }, []);

  // console.log(tiers);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      duration: 'twoWeeks',
      tier: '0',
    },
  });

  const appContext = useContext(AppContext);

  const balance = appContext.tokenBalance;

  const getAPY = (value: string): number => {
    return value === 'oneWeek'
      ? tiers[Number(form.watch('tier'))]?.oneWeekApy
      : value === 'twoWeeks'
        ? tiers[Number(form.watch('tier'))]?.twoWeeksApy
        : value === 'oneMonth'
          ? tiers[Number(form.watch('tier'))]?.oneMonthApy
          : value === 'threeMonths'
            ? tiers[Number(form.watch('tier'))]?.threeMonthsApy
            : tiers[Number(form.watch('tier'))].sixMonthsApy;
  };

  function calculatePercentage(value: number, percentage: number) {
    const calculatedValue = (value * percentage) / 100;
    setCalculatedValue(calculatedValue + value);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    calculatePercentage(Number(data?.amount), getAPY(data.duration));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[63.5294117647%] space-y-[46px] rounded-[20px] bg-white p-8 dark:bg-[var(--color-lambo-black)] max-xl:w-full max-lg:space-y-8 max-lg:p-6 max-md:rounded-none lg:max-xl:rounded-none"
      >
        <p className="text-2xl leading-[31.25px] text-[var(--color-black)]">
          Estimate your returns
        </p>
        <FormField
          control={form.control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium leading-[23.44px] text-[var(--color-black)] max-lg:text-base">
                Select Tier
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-[var(--color-black)]">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.isArray(tiers) && tiers.length > 0 ? (
                    tiers.map((tier, i) => (
                      <SelectItem key={tier._id} value={i.toString()}>
                        {tier.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="px-2 text-gray-500">No tiers available</p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              onSetMax={() => form.setValue('amount', Number(balance))}
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
              description={`Projected yield: APY ${getAPY(field.value)}%`}
              options={[
                { label: '7 days', value: 'oneWeek' },
                { label: '14 days', value: 'twoWeeks' },
                { label: '1 month', value: 'oneMonth' },
                { label: '3 months', value: 'threeMonths' },
                { label: '6 months', value: 'sixMonths' },
              ]}
              field={field}
            />
          )}
        />
        <p className="text-[var(--color-black)]">
          Total rewards: {calculatedValue} LAMBO
        </p>
        <ButtonLoading
          className="w-full"
          variant={'secondary'}
          type="submit"
          label="Calculate rewards"
          isPending={false}
          disabled={false}
        />
      </form>
    </Form>
  );
};

export default CalculatorForm;
