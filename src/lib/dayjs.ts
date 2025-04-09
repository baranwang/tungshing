import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { PluginLunar } from 'dayjs-plugin-lunar';
import 'dayjs/locale/zh-cn';
import { LunarFestival } from 'tyme4ts';

LunarFestival.NAMES = LunarFestival.NAMES.map((name) => {
  switch (name) {
    case '元宵节':
      return '上元';
    case '龙头节':
      return '';
    case '上巳节':
      return '上巳';
    case '清明节':
      return '清明';
    case '端午节':
      return '端午';
    case '七夕节':
      return '七夕';
    case '中元节':
      return '中元';
    case '中秋节':
      return '中秋';
    case '重阳节':
      return '重阳';
    case '冬至节':
      return '冬至';
    case '腊八节':
      return '腊八';
    default:
      return name;
  }
});

dayjs.locale('zh-cn');
dayjs.extend(PluginLunar);
dayjs.extend(isBetween);

export { dayjs };
