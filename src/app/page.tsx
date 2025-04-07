import { dayjs } from '@/lib/dayjs';
import DatePage from './[date]/page';
import { DATE_FORMAT } from '@/lib/constants';

export default function Page() {
  return <DatePage params={Promise.resolve({ date: dayjs().format(DATE_FORMAT) })} />;
}
