'use client';

import { DualHourAlmanac } from '@/components/dual-hour-almanac';
import { LuckText } from '@/components/luck-text';
import { generatePath, getEarthBranchIndexByItem } from '@/utils';
import { dayjs } from '@/utils/dayjs';
import Link from 'next/link';
import { use, useContext, useMemo } from 'react';
import styles from './styles.module.css';
import { DateContext } from '../context';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    dualHour?: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { dateString } = useContext(DateContext);
  const { dualHour } = use(params);
  const parsedDate = dayjs(dateString);

  if (!parsedDate.isValid()) {
    notFound();
  }
  const currentIndex = getEarthBranchIndexByItem(dualHour);
  if (!/^\d{8}$/.test(dateString)) {
    redirect(generatePath(parsedDate, currentIndex));
  }

  const times = useMemo(() => {
    const start = parsedDate.clone().startOf('day');
    return Array.from({ length: 12 }, (_, i) => start.clone().add(i, 'lunar-dual-hour'));
  }, [parsedDate]);

  return (
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
            const content = (
              <>
                {text} · <LuckText>{item.toLunarHour().getTwelveStar().getEcliptic().getLuck().toString()}</LuckText>
              </>
            );
            return (
              <div key={text} className="flex flex-col items-center gap-1">
                {isCurrent ? (
                  <span className="font-black [writing-mode:vertical-rl]">{content}</span>
                ) : (
                  <Link
                    className="[writing-mode:vertical-rl] hover:font-black"
                    href={generatePath(parsedDate, index)}
                    replace
                  >
                    {content}
                  </Link>
                )}
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
  );
}
