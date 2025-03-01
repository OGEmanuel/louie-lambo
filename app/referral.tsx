'use client';

import { ButtonLoading } from '@/components/ui/button-loading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Referral = () => {
  return (
    <>
      <div className="flex flex-col gap-[46px]">
        <div className="flex flex-col gap-[7px] text-center">
          <p className="text-2xl leading-[31.25px]">Refer & Earn</p>
          <p className="leading-[20.83px] text-[var(--color-gray)]">
            Earn free XRP bonus from referrals
          </p>
        </div>
        <ReferralForm />
      </div>
      <div className="flex flex-col gap-[13px] leading-[20.83px]">
        <p className="">Referral link</p>
        <div className="flex max-2xl:flex-col max-2xl:gap-2 max-xl:flex-row max-xl:items-center max-xl:justify-between 2xl:items-center 2xl:justify-between">
          <p className="text-[var(--color-gray)] max-2xl:line-clamp-1 max-2xl:text-ellipsis">
            https://xrpthestan.....34xcvsk5
          </p>
          <div className="flex items-center gap-1">
            <Copy />
            <p>Copy</p>
          </div>
        </div>
      </div>
    </>
  );
};

const ReferralFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
});

const ReferralForm = () => {
  const form = useForm<z.infer<typeof ReferralFormSchema>>({
    resolver: zodResolver(ReferralFormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof ReferralFormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>;
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  {...field}
                  className="h-[49px] w-full rounded-[10px] p-[14px] text-base leading-[20.83px] shadow-none placeholder:text-[var(--color-gray)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoading
          type="submit"
          label="Refer"
          className="w-full text-base font-normal leading-[20.83px] max-lg:h-[49px]"
          isPending={false}
        />
      </form>
    </Form>
  );
};
