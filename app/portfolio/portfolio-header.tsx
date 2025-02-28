import CopyBig from '../components/icons/copy-big';
import RibbonFirstSmall from '../components/icons/ribbon-first-small';
import SecurityCard from '../components/icons/security-card';

const PortfolioHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <WalletDetails />
      <Balance />
    </div>
  );
};

export default PortfolioHeader;

const WalletDetails = () => {
  return (
    <div className="flex items-center gap-[17px]">
      <div className="rounded-[10px] border border-[#E4E4E4] p-3">
        <SecurityCard />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-2xl leading-[31.25px] text-[var(--color-black)]">
            0x7f9........sdd00
          </p>
          <CopyBig />
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
    <div className="flex w-2/5 justify-between">
      <div className="flex flex-col gap-6 pb-[26px] pt-3 text-center">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
          XRP balance
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
          250 XRP
        </p>
      </div>
      <div className="w-[1px] border-l border-[var(--color-stroke)]"></div>
      <div className="flex flex-col gap-6 pb-[26px] pt-3 text-center">
        <p className="text-xl leading-[26.04px] text-[var(--color-gray)]">
          Lamboo balance
        </p>
        <p className="text-[28px] font-medium leading-[36.46px] text-[var(--color-black)]">
          450 Lambo
        </p>
      </div>
    </div>
  );
};
