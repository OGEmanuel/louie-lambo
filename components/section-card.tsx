import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const SectionCard = (props: {
  className?: string;
  children: ReactNode;
  wrapperClassName?: string;
}) => {
  return (
    <section
      className={cn(
        'w-full max-2xl:pr-[120px] max-lg:pl-6 max-lg:pr-6',
        props.wrapperClassName,
      )}
    >
      <div
        className={cn(
          'rounded-[20px] border-[var(--color-stroke)] sm:border sm:p-8',
          props.className,
        )}
      >
        {props.children}
      </div>
    </section>
  );
};

export default SectionCard;
