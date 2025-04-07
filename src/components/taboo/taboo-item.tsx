import { memo } from 'react';

import { TABOO_TYPE_MAP, TabooTheme, TabooTypeKey } from './constants';

import type { Taboo as TabooType } from 'tyme4ts';

export interface TabooItemProps {
  type: TabooTypeKey;
  taboos: TabooType[];
  theme: TabooTheme;
}

export const TabooItem = memo<TabooItemProps>(({ type, taboos, theme }) => {
  const typeConfig = TABOO_TYPE_MAP[type];
  const hasTaboos = taboos.length > 0;

  return (
    <div className="flex gap-3">
      <div
        className={`flex size-9 flex-shrink-0 items-center justify-center rounded-full ${typeConfig.theme[theme]} font-black`}
        aria-label={typeConfig.text}
      >
        {typeConfig.text}
      </div>
      <div className="flex flex-wrap gap-1 pt-1.5">
        {hasTaboos ? taboos.map((taboo) => <span key={taboo.toString()}>{taboo.toString()}</span>) : '无'}
      </div>
    </div>
  );
});

TabooItem.displayName = 'TabooItem';
