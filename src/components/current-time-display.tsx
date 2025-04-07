'use client';

import { useEffect, useState } from 'react';

import { dayjs } from '@/lib/dayjs';

export const CurrentTimeDisplay: React.FC = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    let frameId: number;
    let lastUpdateTime = 0;
    const updateClock = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= 1000 || lastUpdateTime === 0) {
        setNow(dayjs());
        lastUpdateTime = timestamp;
      }
      frameId = requestAnimationFrame(updateClock);
    };
    frameId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <span suppressHydrationWarning>{now.format('LhLK')}</span>;
};
