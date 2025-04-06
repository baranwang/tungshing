import dayjs from 'dayjs';
import { PluginLunar } from 'dayjs-plugin-lunar';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(PluginLunar);

export { dayjs };
