import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TierI } from './types';

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

export const getDurationInDaysWords = (duration: string): number => {
  switch (duration) {
    case 'oneWeek':
      return 7;
    case 'oneMonth':
      return 30;
    case 'threeMonths':
      return 90;
    case 'sixMonths':
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

export function calculateStakeRewards(
  stake: number,
  apy: number,
  duration: number,
  startDate: Date,
  currentDate: Date,
): number {
  const minutesInTwoWeeks = 1 * duration * 24 * 60;
  const rewardPerMinute = apy / minutesInTwoWeeks;

  const elapsedMinutes = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60),
  );
  const totalRewardPercentage = rewardPerMinute * elapsedMinutes;

  const earnedRewards = (totalRewardPercentage / 100) * stake;
  return earnedRewards;
}

export const getApyBasedOnTierAndDuration = (tier: TierI, duration: number) => {
  const perc: number =
    duration === 7
      ? tier.oneWeekApy
      : duration == 14
        ? tier.twoWeeksApy
        : duration == 30
          ? tier.oneMonthApy
          : duration == 90
            ? tier.threeMonthsApy
            : duration == 180
              ? tier.sixMonthsApy
              : 0;

  return perc;
};

export function calculateStakingRewards(
  initialStake: number,
  apy: number,
  days: number,
): number {
  const annualRate = apy / 100;
  const dailyRate = (initialStake * annualRate) / 365;

  const totalRewards = dailyRate * days;
  return totalRewards;
}

export function calculateElapsedRewards(
  initialStake: number,
  apy: number,
  duration: number,
  startDate: Date,
  endDate: Date,
): number {
  const annualRate = apy / 100;
  const dailyRate = (initialStake * annualRate) / 365;
  const minuteRate = dailyRate / (24 * 60);
  // const totalRewards = dailyRate * duration;

  const elapsedMinutes = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60),
  );

  const rewardPerMinute = minuteRate * elapsedMinutes;

  return rewardPerMinute;
}
