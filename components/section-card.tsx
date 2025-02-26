import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const SectionCard = (props: { className?: string; children: ReactNode }) => {
  return (
    <section
      className={cn(
        'w-full rounded-[20px] border border-[var(--color-stroke)] p-8',
        props.className,
      )}
    >
      {props.children}
    </section>
  );
};

export default SectionCard;
