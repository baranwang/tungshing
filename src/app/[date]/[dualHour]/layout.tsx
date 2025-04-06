import { dayjs } from '@/utils/dayjs';
import { notFound } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    date: string;
    dualHour: string;
  }>;
};

export async function generateMetadata({ params }: LayoutProps) {
  const { date } = await params;
  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    notFound();
  }
  return {
    title: `万年历 - ${parsedDate.format('YYYY 年 M 月 D 日 dddd')}`,
  };
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
