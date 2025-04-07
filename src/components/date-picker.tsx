'use client';

import { cloneElement, isValidElement, useMemo, useRef } from 'react';

import { DATE_RANGE } from '@/lib/constants';
import { dayjs } from '@/lib/dayjs';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export const DatePicker = ({ value, onChange, children }: DatePickerProps) => {
  const datePickerRef = useRef<HTMLInputElement>(null);

  const content = useMemo(() => {
    if (!isValidElement(children)) {
      return children;
    }
    const props: React.HTMLAttributes<HTMLElement> = { ...(children.props as React.HTMLAttributes<HTMLElement>) };
    const originalOnClick = props.onClick;
    props.onClick = (...args) => {
      datePickerRef.current?.showPicker();
      originalOnClick?.(...args);
    };
    props.className = `${props.className} cursor-pointer`;
    return cloneElement(children, props);
  }, [children]);

  return (
    <span className="relative">
      {content}
      <input
        type="date"
        ref={datePickerRef}
        className="absolute inset-0 -z-1 size-full opacity-0"
        value={dayjs(value).format('YYYY-MM-DD')}
        min={DATE_RANGE[0].toISOString().split('T')[0]}
        max={DATE_RANGE[1].toISOString().split('T')[0]}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />
    </span>
  );
};
