import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { PluginLunar } from 'dayjs-plugin-lunar';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(PluginLunar);
dayjs.extend(isBetween);

export { dayjs };
