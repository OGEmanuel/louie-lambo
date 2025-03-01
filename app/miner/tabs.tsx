import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Deposit from './deposit';
import Withdraw from './withdraw';
import { Button } from '@/components/ui/button';
import { Referral } from '../referral';
import { Separator } from '@/components/ui/separator';
import { Dispatch, SetStateAction } from 'react';
import MinerSuccess from '../components/icons/miner-success';

const MinerTabs = () => {
  return (
    <Tabs defaultValue="deposit" className="">
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit" className="w-full">
        <Deposit />
      </TabsContent>
      <TabsContent value="withdraw" className="w-full">
        <Withdraw />
      </TabsContent>
    </Tabs>
  );
};

export default MinerTabs;

export const Summary = () => {
  return (
    <div className="flex w-[36.4705882353%] flex-col gap-[76px] bg-white p-12 max-xl:w-full max-xl:gap-12 max-lg:px-6 md:rounded-[20px] lg:max-xl:rounded-none">
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-[var(--color-stroke)] px-[46px] pb-[47.5px] pt-[48.25px] text-center font-medium">
        <p className="leading-[20.83px]">XRP mined</p>
        <p className="text-[28px] leading-[36.46px]">150 XRP</p>
      </div>
      <div className="flex gap-6 max-2xl:flex-col max-xl:flex-row 2xl:gap-12">
        <Button
          variant={'outline'}
          className="basis-full border-[var(--color-lambo-green)] max-xl:h-[49px]"
        >
          Re-mine
        </Button>
        <Button variant={'outline'} className="basis-full max-xl:h-[49px]">
          Claim reward
        </Button>
      </div>
      <Separator className="bg-[var(--color-stroke)]" />
      <Referral />
    </div>
  );
};

export const SuccessPage = (props: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  type: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <MinerSuccess />
      <div className="py-[23.5px]"></div>
      <p className="text-[28px] font-semibold leading-[36.46px] text-[var(--color-black)]">
        Congratulations!
      </p>
      <div className="py-[10.5px]"></div>
      <p>You have successfully {props.type} 25 XRP to your wallet</p>
      <div className="py-[17.5px]"></div>
      <Button
        onClick={() => props.setIsSuccess(false)}
        variant={'outline'}
        className="basis-full"
      >
        Go Back
      </Button>
    </div>
  );
};
