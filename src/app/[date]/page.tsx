'use client';

import { DailyAlmanac } from '@/components/daily-almanac';
import { DualHourAlmanac } from '@/components/dual-hour-almanac';
import { getEarthBranchIndexByItem, getEarthBranchItemByIndex } from '@/utils';
import { dayjs } from '@/utils/dayjs';
import { notFound } from 'next/navigation';
import { use, useEffect, useMemo, useState } from 'react';
import { DatePicker } from '@/components/date-picker';
import { LuckText } from '@/components/luck-text';

import styles from './styles.module.css';

interface PageProps {
  params: Promise<{
    date: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const paramsData = use(params);
  const [dateString, setDateString] = useState(paramsData.date);
  const parsedDate = useMemo(() => dayjs(dateString), [dateString]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const hash = 'location' in globalThis ? globalThis.location.hash : '';
    if (hash) {
      return getEarthBranchIndexByItem(hash.slice(1));
    }
    return parsedDate.isSame(dayjs(), 'day') ? parsedDate.toLunarHour().getIndexInDay() : 0;
  });

  useEffect(() => {
    self.history.pushState(null, '', `#${getEarthBranchItemByIndex(currentIndex)}`);
  }, [currentIndex]);

  useEffect(() => {
    const dateStringOnPath = self.location.pathname.slice(1);
    if (dateString !== dateStringOnPath) {
      self.history.pushState(null, '', `/${dateStringOnPath}`);
    }
  }, [dateString]);

  if (!parsedDate.isValid()) {
    notFound();
  }

  const times = useMemo(() => {
    const start = parsedDate.clone().startOf('day');
    return Array.from({ length: 12 }, (_, i) => start.clone().add(i, 'lunar-dual-hour'));
  }, [parsedDate]);

  return (
    <div className="mx-auto flex max-w-3xl min-w-sm flex-col gap-9 p-9">
      <DailyAlmanac
        dateString={dateString}
        renderSolarText={(date) => (
          <DatePicker value={dateString} onChange={(value) => setDateString(value)}>
            <button type="button" className="inline-flex items-center gap-2 border-none bg-transparent">
              {date.format('YYYY 年 M 月 D 日 dddd')}
              <svg width="8" height="12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.696 6H8c0-.165-.036-.342-.293-.47C5.057 4.212 2.809 2.212 1.07.11A.302.302 0 00.837 0H.103a.05.05 0 00-.04.08L4.696 6zM4.696 6H8c0 .165-.036.342-.293.47-2.65 1.318-4.898 3.318-6.637 5.42a.302.302 0 01-.233.11H.103a.05.05 0 01-.04-.08L4.696 6z" />
              </svg>
            </button>
          </DatePicker>
        )}
      />

      <div>
        <div className="mb-4">
          <div className={`${styles.line} mb-4`}>
            <span />
          </div>
          <div className="flex justify-between">
            {times.map((item) => {
              const text = item.format('LH');
              const index = item.toLunarHour().getIndexInDay();
              const isCurrent = index === currentIndex;
              return (
                <div key={text} className="flex flex-col items-center gap-1">
                  <a
                    className={`${isCurrent ? 'font-black' : ''} [writing-mode:vertical-rl] hover:font-black`}
                    href={`#${getEarthBranchItemByIndex(index)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentIndex(index);
                    }}
                  >
                    {text}
                    {' · '}
                    <LuckText>{item.toLunarHour().getTwelveStar().getEcliptic().getLuck().toString()}</LuckText>
                  </a>
                  {isCurrent && (
                    <svg viewBox="0 0 16 16" className="size-3">
                      <title>句读</title>
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        className={`stroke-brand-5 fill-none stroke-3 ${styles['animated-circle']}`}
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <DualHourAlmanac dateString={times[currentIndex]?.toString()} />
      </div>
    </div>
  );
}
