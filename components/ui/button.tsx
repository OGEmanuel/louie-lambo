import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 leading-[15.62px] md:leading-[23.44px] text-[var(--color-black)] text-xs md:text-lg whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transition-transform duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-lambo-green)] hover:bg-[var(--color-lambo-green)]/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border text-base leading-[20.83px] border-[var(--color-stroke)] bg-white',
        secondary:
          'bg-[var(--color-lambo-black)] text-[var(--color-lambo-green)] border border-[var(--color-lambo-green)] shadow-sm hover:bg-[var(--color-lambo-black)]/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        max: 'text-[var(--color-black)] rounded-lg bg-white max-lg:text-lg',
      },
      size: {
        default: 'h-[36px] px-4 py-2 sm:h-[51px]',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        max: 'h-max w-max py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
