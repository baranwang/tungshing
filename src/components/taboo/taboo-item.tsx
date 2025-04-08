import { memo } from 'react';

import { TABOO_TEXT_MAP } from './constants';

import type { TabooTheme, TabooTypeKey } from './constants';
import type { Taboo as TabooType } from 'tyme4ts';

import classNames from 'classnames';

export interface TabooItemProps {
  type: TabooTypeKey;
  taboos: TabooType[];
  theme: TabooTheme;
}

export const TabooItem = memo<TabooItemProps>(({ type, taboos, theme }) => {
  const text = TABOO_TEXT_MAP[type];
  const hasTaboos = taboos.length > 0;
  const uniqueTaboos = [...new Set(taboos.map((taboo) => taboo.toString()))];

  return (
    <div className="flex gap-3">
      <div
        className={classNames('octagon flex size-9 flex-shrink-0 items-center justify-center bg-current font-black', {
          'text-brand-5': type === 'recommend',
          'text-grey-9': type === 'avoid',
          'before:octagon before:bg-brand-0 relative before:absolute before:inset-px': theme === 'simple',
        })}
        aria-label={text}
      >
        <span className={classNames('z-1', { 'text-white': theme === 'full' })}>{text}</span>
      </div>

      <div className="flex flex-wrap gap-1 pt-1.5">
        {hasTaboos ? uniqueTaboos.map((taboo) => <span key={taboo}>{taboo}</span>) : '无'}
      </div>
    </div>
  );
});

TabooItem.displayName = 'TabooItem';
