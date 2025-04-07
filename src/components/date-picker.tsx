'use client';

import { dayjs } from '@/utils/dayjs';
import { cloneElement, isValidElement, useMemo, useRef } from 'react';

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
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />
    </span>
  );
};
