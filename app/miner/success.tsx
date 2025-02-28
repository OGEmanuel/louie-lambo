import { Dispatch, SetStateAction } from 'react';
import MinerSuccess from '../components/icons/miner-success';
import { Button } from '@/components/ui/button';

const SuccessPage = (props: {
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

export default SuccessPage;
