import { memo, useMemo } from 'react';

import { Explain } from './explain';

import type { EXPLANATION_MAP } from './explain/constants';

export interface AttributeDisplayProps {
  type?: keyof typeof EXPLANATION_MAP;
  attribute: keyof typeof EXPLANATION_MAP | (string & {});
  value: React.ReactNode;
}

export const AttributeDisplay = memo<AttributeDisplayProps>(({ attribute, value, type = attribute }) => {
  const content = useMemo(() => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <Explain key={item.toString()} type={type as keyof typeof EXPLANATION_MAP}>
              {item.toString()}
            </Explain>
          ))}
        </div>
      );
    }
    return value;
  }, [type, value]);

  return (
    <div className="flex gap-1">
      <span className="text-brand-5 font-black whitespace-nowrap">{attribute}</span>
      <Explain className="text-grey-9" type={type as keyof typeof EXPLANATION_MAP}>
        {content}
      </Explain>
    </div>
  );
});

AttributeDisplay.displayName = 'AttributeDisplay';
