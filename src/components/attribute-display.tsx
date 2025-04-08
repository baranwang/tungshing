import { memo, useMemo } from 'react';

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
            <span key={item.toString()}>{item.toString()}</span>
          ))}
        </div>
      );
    }
    return value;
  }, [value]);

  return (
    <div className="flex gap-1">
      <span className="text-brand-5 font-black whitespace-nowrap">{attribute}</span>
      <span className="text-grey-9">{content}</span>
    </div>
  );
});

AttributeDisplay.displayName = 'AttributeDisplay';
