'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useMemo, useRef, useState } from 'react';

import { ActiveMark } from '@/components/active-mark';
import { ArrowIcon } from '@/components/arrow-icon';
import { DailyAlmanac } from '@/components/daily-almanac';
import { DatePicker } from '@/components/date-picker';
import { DualHourAlmanac } from '@/components/dual-hour-almanac';
import { LuckDisplay } from '@/components/luck-display';
import { WeeklyDatePicker } from '@/components/weekly-date-picker';
import { DATE_FORMAT, DATE_FORMAT_WITH_TIME, DATE_RANGE } from '@/lib/constants';
import { dayjs } from '@/lib/dayjs';
import { getEarthBranchIndexByItem, getEarthBranchItemByIndex, parseDateString } from '@/lib/utils';

import styles from './styles.module.css';
import classNames from 'classnames';

interface Props {
  params: Promise<{
    date?: string;
  }>;
}

export default function Page({ params }: Props) {
  const paramsData = use(params);
  const [dateString, setDateString] = useState(paramsData.date || dayjs().format(DATE_FORMAT));
  const parsedDate = useMemo(() => parseDateString(dateString), [dateString]);

  if (!parsedDate?.isValid() || !parsedDate.isBetween(...DATE_RANGE)) {
    notFound();
  }

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

  const isInitial = useRef(true);

  useEffect(() => {
    if (!isInitial.current && paramsData.date !== dateString) {
      self.history.pushState(null, '', `/${dateString}`);
    }
    isInitial.current = false;
  }, [dateString, paramsData.date]);

  const times = useMemo(() => {
    const start = parsedDate.clone().startOf('day');
    return Array.from({ length: 12 }, (_, i) => start.clone().add(i, 'lunar-dual-hour'));
  }, [parsedDate]);

  return (
    <div className="flex flex-col gap-9">
      <WeeklyDatePicker currentDateString={dateString} onChange={setDateString} />

      <DailyAlmanac
        dateString={dateString}
        renderSolarText={(date) => (
          <DatePicker value={dateString} onChange={setDateString}>
            <button type="button" className="inline-flex items-center gap-2 border-none bg-transparent">
              {date.format('YYYY 年 M 月 D 日 dddd')}
              <ArrowIcon className="text-xs" />
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
                <div key={text} className="flex flex-col items-center gap-1" suppressHydrationWarning>
                  <a
                    className={classNames('whitespace-nowrap [writing-mode:vertical-rl] hover:font-black', {
                      'font-black': isCurrent,
                    })}
                    href={`#${getEarthBranchItemByIndex(index)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentIndex(index);
                    }}
                  >
                    {text}
                    {' · '}
                    <LuckDisplay time={item.toLunarHour()} />
                  </a>
                  <ActiveMark active={isCurrent} />
                </div>
              );
            })}
          </div>
        </div>
        <DualHourAlmanac dateString={times[currentIndex]?.format(DATE_FORMAT_WITH_TIME)} />
      </div>
    </div>
  );
}
