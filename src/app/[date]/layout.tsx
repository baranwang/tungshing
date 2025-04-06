'use client';

import { DailyAlmanac } from '@/components/daily-almanac';
import { dayjs } from '@/utils/dayjs';
import { notFound } from 'next/navigation';
import { use, useMemo, useState } from 'react';
import { DateContext } from './context';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    date: string;
  }>;
};

export default function Layout({ children, params }: LayoutProps) {
  const paramsData = use(params);
  const [dateString, setDateString] = useState(paramsData.date);
  const parsedDate = useMemo(() => dayjs(dateString), [dateString]);

  if (!parsedDate.isValid()) {
    notFound();
  }
  return (
    <>
      <div className="mx-auto flex max-w-3xl min-w-sm flex-col gap-9 p-9">
        <DailyAlmanac
          dateString={dateString}
          renderSolarText={(date) => (
            <span className="relative inline-flex items-center gap-2">
              {date.format('YYYY 年 M 月 D 日 dddd')}
              <svg width="8" height="12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.696 6H8c0-.165-.036-.342-.293-.47C5.057 4.212 2.809 2.212 1.07.11A.302.302 0 00.837 0H.103a.05.05 0 00-.04.08L4.696 6zM4.696 6H8c0 .165-.036.342-.293.47-2.65 1.318-4.898 3.318-6.637 5.42a.302.302 0 01-.233.11H.103a.05.05 0 01-.04-.08L4.696 6z" />
              </svg>
              <input
                type="date"
                value={dateString}
                className="absolute inset-0 cursor-pointer opacity-0"
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={(e) => {
                  const value = dayjs(e.currentTarget.value).format('YYYYMMDD');
                  setDateString(value);
                  window.history.pushState(null, '', `/${value}`);
                }}
              />
            </span>
          )}
        />
        <DateContext.Provider value={{ dateString }}>{children}</DateContext.Provider>
      </div>
    </>
  );
}
