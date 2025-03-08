import React from 'react';

interface SuccessProps {
  successText: string;
}

const Success: React.FC<SuccessProps> = ({ successText }) => {
  return (
    <div className="z-10 m-7 flex w-full max-w-fit items-center rounded-[16px] border-2 border-[#01E17B] bg-[#E5FCF1] px-10 py-4 font-semibold text-[#28292A] shadow-md">
      {successText}
    </div>
  );
};

export default Success;
