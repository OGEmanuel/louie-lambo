import { Button } from '@/components/ui/button';
import { Referral } from '../referral';

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
      <Referral />
    </div>
  );
};

export default Summary;
