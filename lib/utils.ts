import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateXrpAddress(
  address: string,
  startLength = 6,
  endLength = 6,
): string {
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export const getDurationInDays = (duration: string): number => {
  switch (duration) {
    case '7-days':
      return 7;
    case '14-days':
      return 14;
    case '1-month':
      return 30;
    case '3-months':
      return 90;
    case '6-months':
      return 180;
    default:
      throw new Error('Invalid duration');
  }
};

export function isUnlockDateEarly(unlockDate: Date): boolean {
  const today = new Date();
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const dt = new Date(unlockDate);
  const unlockDateOnly = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
  );

  return todayDateOnly < unlockDateOnly;
}
