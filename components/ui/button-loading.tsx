import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface ButtonLoadingProps extends ButtonProps {
  isPending: boolean;
  label: string | ReactNode;
}

export const ButtonLoading = (props: ButtonLoadingProps) => {
  const { isPending, label, variant, type, className } = props;

  return (
    <Button
      type={type}
      variant={variant ? variant : 'default'}
      className={cn(
        'grid-stack grid w-max gap-0 overflow-hidden max-sm:w-full',
        className,
      )}
    >
      <span
        className={cn(
          'grid-area-stack visible translate-y-0 transition-all',
          isPending && 'invisible -translate-y-[200px]',
          typeof label !== 'string' && 'flex items-center gap-2',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          `grid-area-stack invisible flex w-full translate-y-[200px] justify-center transition-all`,
          isPending && 'visible translate-y-0',
        )}
      >
        <Loader2 aria-label="Loading" className="animate-spin" />
      </span>
    </Button>
  );
};
