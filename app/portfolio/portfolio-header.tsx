import { Separator } from '@/components/ui/separator';
import CopyBig from '../components/icons/copy-big';
import CopyMobile from '../components/icons/copy-mobile';
import RibbonFirstSmall from '../components/icons/ribbon-first-small';
import SecurityCard from '../components/icons/security-card';
import SecurityCardMobile from '../components/icons/security-card-mobile';

const PortfolioHeader = () => {
  return (
    <div className="flex justify-between max-sm:flex-col max-sm:gap-16 sm:items-center">
      <WalletDetails />
      <Balance />
    </div>
  );
};

export default PortfolioHeader;

const WalletDetails = () => {
  return (
    <div className="flex items-center justify-between gap-[17px]">
      <div className="rounded-[10px] border border-[#E4E4E4] p-3">
        <SecurityCard className="hidden lg:block" />
        <SecurityCardMobile className="lg:hidden" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="leading-[20.83px] text-[var(--color-black)] lg:text-2xl lg:leading-[31.25px]">
            0x7f9........sdd00
          </p>
          <CopyBig className="hidden lg:block" />
          <CopyMobile className="lg:hidden" />
        </div>
        <div className="flex items-center gap-[7px]">
          <RibbonFirstSmall />
          <p>Tier 1</p>
        </div>
      </div>
    </div>
  );
};

const Balance = () => {
  return (
    <div className="flex max-xl:gap-7 max-sm:flex-col max-sm:items-center lg:w-2/5 lg:justify-between">
      <div className="flex flex-col gap-3 text-center lg:gap-6 lg:pb-[26px] lg:pt-3">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)] max-lg:text-sm max-lg:leading-[18.23px]">
          XRP balance
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)] max-lg:text-xl max-lg:leading-[26.04px]">
          250 XRP
        </p>
      </div>
      <Separator className="w-[62px] bg-[var(--color-stroke)] sm:hidden" />
      <Separator
        orientation="vertical"
        className="hidden h-auto bg-[var(--color-stroke)] sm:block"
      />
      <div className="flex flex-col gap-3 text-center lg:gap-6 lg:pb-[26px] lg:pt-3">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)] max-lg:text-sm max-lg:leading-[18.23px]">
          Lambo balance
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)] max-lg:text-xl max-lg:leading-[26.04px]">
          450 Lambo
        </p>
      </div>
    </div>
  );
};
