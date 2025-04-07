import { DATE_FORMAT } from './constants';
import { dayjs } from './dayjs';

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

/**
 * 解析日期字符串
 * 解决 dayjs 解析日期字符串时，会分割年月日，导致 Date 对象可能错误触发 < 100 自动补 19xx 的问题
 */
export const parseDateString = (dateString: string, format: string = DATE_FORMAT) => {
  if (!dateString) {
    return null;
  }
  if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(dateString)) {
    const parsedDate = dayjs(new Date(dateString));
    return parsedDate.isValid() ? parsedDate : null;
  }
  const date = dayjs(dateString, format, true);
  if (date.isValid() && date.format(format) === dateString) {
    return date;
  }
  return null;
};
