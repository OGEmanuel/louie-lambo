const TransactionDetails = (props: { balance: number }) => {
  return (
    <div className="flex flex-col gap-6 leading-[20.83px]">
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Balance</p>
        <p className="font-medium">{props.balance} XRP</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--color-gray)]">XRP Deposited</p>
        <p className="font-medium">28 XRP</p>
      </div>
    </div>
  );
};

export default TransactionDetails;
