import { memo, useMemo } from 'react';

import { Explain } from './explain';

export interface AttributeDisplayProps {
  attribute: React.ReactNode;
  value: React.ReactNode;
}

export const AttributeDisplay = memo<AttributeDisplayProps>(({ attribute, value }) => {
  const content = useMemo(() => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <Explain key={item.toString()}>{item.toString()}</Explain>
          ))}
        </div>
      );
    }
    return value;
  }, [value]);

  return (
    <div className="flex gap-1">
      <span className="text-brand-5 font-black whitespace-nowrap">{attribute}</span>
      <Explain className="text-grey-9">{content}</Explain>
    </div>
  );
});

AttributeDisplay.displayName = 'AttributeDisplay';
