import { memo } from 'react';
import type { LunarDay, LunarHour, Taboo as TabooType } from 'tyme4ts';

const TABOO_TYPE_MAP = {
  recommend: {
    text: '宜',
    theme: {
      full: 'bg-brand-5 text-white',
      simple: 'text-brand-5 border border-brand-5',
    },
  },
  avoid: {
    text: '忌',
    theme: {
      full: 'bg-black text-white',
      simple: 'text-black border border-black',
    },
  },
} as const;

export interface TabooItemProps {
  type: keyof typeof TABOO_TYPE_MAP;
  taboos: TabooType[];
  theme: 'simple' | 'full';
}

export const TabooItem = memo<TabooItemProps>(({ type, taboos, theme }) => {
  return (
    <div className="flex gap-3">
      <div
        className={`flex size-9 flex-shrink-0 items-center justify-center rounded-full ${TABOO_TYPE_MAP[type].theme[theme]} font-black`}
      >
        {TABOO_TYPE_MAP[type].text}
      </div>
      <div className="flex flex-wrap gap-1 pt-1.5">
        {taboos.length > 0 ? taboos.map((taboo) => <span key={taboo.toString()}>{taboo.toString()}</span>) : '无'}
      </div>
    </div>
  );
});

TabooItem.displayName = 'TabooItem';

export interface TabooProps {
  theme: TabooItemProps['theme'];
  time: LunarDay | LunarHour;
}

export const Taboo = memo<TabooProps>(({ time, theme }) => {
  return (
    <div className={`flex flex-col ${theme === 'full' ? 'gap-y-4' : 'gap-y-2'}`}>
      <TabooItem type="recommend" taboos={time.getRecommends()} theme={theme} />
      <TabooItem type="avoid" taboos={time.getAvoids()} theme={theme} />
    </div>
  );
});

Taboo.displayName = 'Taboo';
