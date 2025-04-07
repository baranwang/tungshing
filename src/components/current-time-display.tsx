'use client';

import { useEffect, useState } from 'react';

import { dayjs } from '@/lib/dayjs';

export const CurrentTimeDisplay: React.FC = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    let frameId: number;
    const updateClock = () => {
      setNow(dayjs());
      frameId = requestAnimationFrame(updateClock);
    };
    frameId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <span suppressHydrationWarning>{now.format('LhLK')}</span>;
};
