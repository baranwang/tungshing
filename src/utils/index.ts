import type { dayjs } from './dayjs';

export const EARTH_BRANCHES = [
  'rat',
  'ox',
  'tiger',
  'rabbit',
  'loong',
  'snake',
  'horse',
  'sheep',
  'monkey',
  'rooster',
  'dog',
  'pig',
] as const;

export const getEarthBranchIndexByItem = (item?: string) => {
  if (!item) {
    return 0;
  }
  const index = EARTH_BRANCHES.indexOf(item as (typeof EARTH_BRANCHES)[number]);
  if (index < 0) {
    return 0;
  }
  return index;
};

export const getEarthBranchItemByIndex = (index: number) => {
  return EARTH_BRANCHES[index];
};

export const generatePath = (date: dayjs.Dayjs, dualHourIndex: number) => {
  return `/${date.format('YYYYMMDD')}/${getEarthBranchItemByIndex(dualHourIndex)}`;
};
