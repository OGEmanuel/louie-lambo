import { cn } from '@/lib/utils';
import { FormControl, FormItem, FormLabel, FormMessage } from './form';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { ComponentProps } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface RadioInputProps extends ComponentProps<'input'> {
  field: ControllerRenderProps<any, any>;
  label?: string;
  options: { label: string; value: string }[];
}

const RadioInput = (props: RadioInputProps) => {
  const { field, label, options } = props;
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-[18px] font-medium leading-[23.44px]">
        {label}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="grid grid-cols-4 gap-[22px] 2xl:grid-cols-5"
        >
          {options.map(option => (
            <FormItem className="basis-full" key={option.label}>
              <FormControl className="hidden">
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel
                className={cn(
                  `text-nowrap rounded-lg border border-[var(--color-stroke)] px-5 py-[10px] leading-[20.83px] text-[var(--color-black)]`,
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
      <FormMessage />
    </FormItem>
  );
};

export default RadioInput;
