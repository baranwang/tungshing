import { dayjs } from '@/utils/dayjs';
import DatePage from './[date]/page';

export default function Page() {
  return <DatePage params={Promise.resolve({ date: dayjs().format('YYYYMMDD') })} />;
}
