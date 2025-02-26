import { Button } from '@/components/ui/button';
import Copy from '../components/icons/copy';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ButtonLoading } from '@/components/ui/button-loading';

const Summary = () => {
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-8 rounded-[20px] bg-white p-12">
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <p className="leading-[20.83px]">XRP mined</p>
        <p className="text-[28px] leading-[36.46px]">150 XRP</p>
      </div>
      <div className="flex gap-6 max-2xl:flex-col 2xl:gap-12">
        <Button
          variant={'outline'}
          className="basis-full border-[var(--color-lambo-green)]"
        >
          Re-mine
        </Button>
        <Button variant={'outline'} className="basis-full">
          Claim reward
        </Button>
      </div>
      <hr />
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
        <div className="flex max-2xl:flex-col max-2xl:gap-2 2xl:items-center 2xl:justify-between">
          <p className="text-[var(--color-gray)]">
            https://xrpthestan.....34xcvsk5
          </p>
          <div className="flex items-center gap-1">
            <Copy />
            <p>Copy</p>
          </div>
        </div>
      </div>
    </div>
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
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
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
          className="w-full text-base font-normal leading-[20.83px]"
          isPending={false}
        />
      </form>
    </Form>
  );
};

export default Summary;
