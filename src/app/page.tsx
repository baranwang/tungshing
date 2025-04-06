import { generatePath } from '@/utils';
import { dayjs } from '@/utils/dayjs';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(generatePath(dayjs(), dayjs().toLunarHour().getIndexInDay()));
}
