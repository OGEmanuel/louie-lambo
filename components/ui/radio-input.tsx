/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { ComponentProps } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface RadioInputProps extends ComponentProps<'input'> {
  field: ControllerRenderProps<any, any>;
  label?: string;
  options: { label: string; value: string }[];
  description?: string;
}

const RadioInput = (props: RadioInputProps) => {
  const { field, label, options, description } = props;
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-lg font-medium leading-[23.44px] max-lg:text-base max-lg:leading-[20.83px]">
        {label}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="grid flex-wrap gap-[22px] max-lg:gap-3 max-lg:gap-y-6 max-md:flex md:grid-cols-5 lg:grid-cols-4 2xl:grid-cols-5"
        >
          {options.map(option => (
            <FormItem className="lg:basis-full" key={option.label}>
              <FormControl className="hidden">
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel
                className={cn(
                  `text-nowrap rounded-lg border border-[var(--color-stroke)] px-5 py-[10px] leading-[20.83px] text-[var(--color-black)] max-lg:text-sm max-lg:leading-[18.3px]`,
                  field.value === option.value &&
                    'border-[1.5px] border-[var(--color-lambo-green)] bg-[var(--color-lambo-black)] text-white',
                )}
              >
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      {description && (
        <FormDescription className="font-medium leading-[20.83px] text-[var(--color-gray)]">
          {description}
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default RadioInput;
