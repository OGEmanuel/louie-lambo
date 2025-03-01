/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { ControllerRenderProps } from 'react-hook-form';
import { Button } from './button';

interface TextInputProps extends ComponentProps<'input'> {
  field: ControllerRenderProps<any, any>;
  label?: string;
  description?: string;
  onSetMax: () => void;
}

const NumberInput = (props: TextInputProps) => {
  const { field, description, onSetMax, label, placeholder } = props;

  return (
    <FormItem className="w-full space-y-[18px]">
      <FormLabel className="text-lg font-medium leading-[23.44px] text-[var(--color-black)] max-lg:text-base">
        {label}
      </FormLabel>
      <div className="flex flex-col gap-3">
        <FormControl>
          <div className="relative">
            <Input
              type="text"
              className="h-[78px] w-full rounded-2xl border border-[var(--color-lambo-green)] bg-[var(--color-bg)] px-[21px] text-[2rem] font-medium leading-[41.66px] text-[var(--color-black)] shadow-none focus-visible:ring-0"
              inputMode="numeric"
              placeholder={placeholder}
              {...field}
              onChange={e => {
                // Only allow numeric input
                const value = e.target.value.replace(/[^0-9.]/g, '');
                field.onChange(value);
              }}
            />
            <Button
              variant={'max'}
              size={'max'}
              type="button"
              className="absolute right-[21px] top-1/2 -translate-y-1/2"
              onClick={() => onSetMax()}
            >
              Max
            </Button>
          </div>
        </FormControl>
        {description && (
          <FormDescription className="text-base font-medium leading-[20.83px] text-[var(--color-gray)] max-lg:text-sm max-lg:leading-[18.23px]">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </div>
    </FormItem>
  );
};

export default NumberInput;
