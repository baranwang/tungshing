import { memo } from 'react';

export interface LuckTextProps {
  className?: string;
  children: string;
}

export const LuckText = memo<LuckTextProps>(({ children, className }) => {
  return <span className={`${className} ${children.includes('吉') ? 'text-brand-5' : 'text-black'}`}>{children}</span>;
});

LuckText.displayName = 'LuckText';
