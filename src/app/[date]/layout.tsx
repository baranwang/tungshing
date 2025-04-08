import { parseDateString } from '@/lib/utils';

import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    date: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const date = await params;
  const parsedDate = parseDateString(date.date);
  const solarText = parsedDate?.format('YYYY 年 M 月 D 日');
  const lunarDate = parsedDate?.toLunarDay();
  const recommends = lunarDate?.getRecommends().join('、');
  const avoids = lunarDate?.getAvoids().join('、');
  return {
    title: `万年历 - ${solarText}`,
    description: `万年历 - 查看 ${solarText}的吉凶宜忌、黄道吉日、农历信息`,
    openGraph: {
      title: `万年历 - ${solarText}`,
      description: `${parsedDate?.format('LY年LMLD')}，宜：${recommends}，忌：${avoids}`,
    },
  };
}

export default function Layout({ children }: Props) {
  return children;
}
