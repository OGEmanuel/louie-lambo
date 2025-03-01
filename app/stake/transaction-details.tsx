const TransactionDetails = () => {
  return (
    <div className="flex flex-col gap-6 leading-[20.83px] max-lg:text-sm max-lg:leading-[18.23px]">
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Transaction cost</p>
        <p className="font-medium">0.24 XRP</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">Exchange rate</p>
        <p className="font-medium">1 $LAMBO = 1.2 XRP</p>
      </div>
    </div>
  );
};

export default TransactionDetails;
