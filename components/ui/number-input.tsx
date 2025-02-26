import { ComponentProps, ReactNode, useEffect } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { ControllerRenderProps } from 'react-hook-form';
import { Label } from './label';
import { cn } from '@/lib/utils';
import searchIcon from '@/assets/icons/search-02.svg';

interface TextInputProps extends ComponentProps<'input'> {
  field: ControllerRenderProps<any, any>;
  validated?: boolean;
  label?: string;
  htmlFor?: string;
  isAuth?: boolean;
  children?: ReactNode;
  isSearch?: boolean;
  containerClassName?: string;
  canAutoGenerate?: boolean;
  description?: string;
}

const NumberInput = (props: TextInputProps) => {
  const {
    field,
    description,
    validated,
    label,
    placeholder,
    type,
    disabled,
    id,
    htmlFor,
    className,
    isAuth,
    children,
    isSearch,
    containerClassName,
    canAutoGenerate,
  } = props;

  return (
    <FormItem className="w-full max-w-[584px]">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="text"
          className="h-[78px] w-full rounded-2xl border border-[var(--color-lambo-green)] bg-[var(--color-bg)] px-[21px] shadow-none focus:ring-0"
          inputMode="numeric"
          placeholder={placeholder}
          {...field}
          onChange={e => {
            // Only allow numeric input
            const value = e.target.value.replace(/[^0-9.]/g, '');
            field.onChange(value);
          }}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default NumberInput;
