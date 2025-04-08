import { memo } from 'react';

import type { LunarDay, LunarHour } from 'tyme4ts';

import classNames from 'classnames';

export interface LuckDisplayProps {
  className?: string;
  time: LunarDay | LunarHour;
}

export const LuckDisplay = memo<LuckDisplayProps>(({ time, className }) => {
  const luck = time.getTwelveStar().getEcliptic().getLuck().toString();
  return (
    <span
      className={classNames(className, {
        'text-brand-5 border-brand-3': luck === '吉',
        'text-grey-9 border-grey-7': luck === '凶',
      })}
    >
      {luck}
    </span>
  );
});

LuckDisplay.displayName = 'LuckDisplay';
