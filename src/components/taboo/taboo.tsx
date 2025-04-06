import { memo, useMemo } from 'react';
import type { LunarDay, LunarHour } from 'tyme4ts';
import { TabooTheme } from './constants';
import { TabooItem } from './taboo-item';

export interface TabooProps {
  theme: TabooTheme;
  time: LunarDay | LunarHour;
}

export const Taboo = memo<TabooProps>(({ time, theme }) => {
  const recommends = useMemo(() => time.getRecommends(), [time]);
  const avoids = useMemo(() => time.getAvoids(), [time]);

  const containerClassName = useMemo(() => `flex flex-col ${theme === 'full' ? 'gap-y-4' : 'gap-y-2'}`, [theme]);

  return (
    <div className={containerClassName}>
      <TabooItem type="recommend" taboos={recommends} theme={theme} />
      <TabooItem type="avoid" taboos={avoids} theme={theme} />
    </div>
  );
});

Taboo.displayName = 'Taboo';
