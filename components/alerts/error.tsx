import React from 'react';

interface ErrorProps {
  errorText: string;
}

const Error: React.FC<ErrorProps> = ({ errorText }) => {
  return <div className="w-full md:w-[200px]">{errorText}</div>;
};

export default Error;
