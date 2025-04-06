import { generatePath } from '@/utils';
import { dayjs } from '@/utils/dayjs';
import { redirect } from 'next/navigation';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    date: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { date } = use(params);
  const parsedDate = dayjs(date);
  const hourIndex = parsedDate.isSame(dayjs(), 'day') ? dayjs().toLunarHour().getIndexInDay() : 0;
  redirect(generatePath(parsedDate, hourIndex));
}
