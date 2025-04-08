import { memo } from 'react';

import Tooltip from 'rc-tooltip';

import { EXPLANATION_MAP } from './constants';

import classNames from 'classnames';

export interface ExplainProps {
  className?: string;
  component?: React.ElementType;
  children: React.ReactNode;
}

export const Explain = memo<ExplainProps>(({ component: Component = 'span', children, className }) => {
  if (!children) {
    return null;
  }
  if (typeof children === 'string') {
    const explanation = EXPLANATION_MAP[children as keyof typeof EXPLANATION_MAP];
    if (explanation) {
      return (
        <Tooltip
          classNames={{
            root: 'max-md:fixed max-md:top-auto! max-md:right-0! max-md:bottom-0! max-md:left-0! absolute max-md:h-fit max-md:before:fixed max-md:before:inset-0 max-md:before:bg-[#00000040] max-md:before:pointer-events-none',
            body: 'max-w-sm bg-[rgba(255,255,255,0.5)] py-3 shadow-2xl max-md:shadow-[0_-25px_50px_-12px_#00000040] backdrop-blur-xl max-md:w-full max-md:max-w-full md:rounded-2xl',
          }}
          placement="bottomLeft"
          overlay={
            <div className="pb-[env(safe-area-inset-bottom)]">
              <div className="px-6 py-2 text-sm font-bold">{children}</div>
              <div className="max-h-40 overflow-y-auto px-6 pb-3 text-xs/relaxed max-md:h-[36vh]">{explanation}</div>
            </div>
          }
        >
          <Component
            className={classNames(
              'decoration-grey-3 underline decoration-dotted underline-offset-4 hover:opacity-80',
              className,
            )}
          >
            {children}
          </Component>
        </Tooltip>
      );
    }
  }
  return <Component className={className}>{children}</Component>;
});

Explain.displayName = 'Explain';
