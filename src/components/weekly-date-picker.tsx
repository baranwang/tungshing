import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDebouncedCallback } from 'use-debounce';

import { ActiveMark } from './active-mark';
import { ArrowIcon } from './arrow-icon';
import { DATE_FORMAT } from '@/lib/constants';
import { dayjs } from '@/lib/dayjs';

import type { Swiper as SwiperClass } from 'swiper/types';

import classNames from 'classnames';

import 'swiper/css';

const ONCE_GENERATE_WEEKS_COUNT = 9;

const SWIPER_NAV_BUTTON_CLASS =
  'text-grey-5 hover:text-grey-7 absolute top-0 z-10 flex h-full w-6 cursor-pointer items-center justify-center transition-colors';

export interface WeeklyDatePickerProps {
  currentDateString: string;
  onChange: (dateString: string) => void;
}

export const WeeklyDatePicker: React.FC<WeeklyDatePickerProps> = ({ currentDateString, onChange }) => {
  const currentDate = useMemo(() => dayjs(currentDateString), [currentDateString]);

  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  const weeks = useMemo(() => {
    return Array.from({ length: ONCE_GENERATE_WEEKS_COUNT }, (_, i) => {
      return currentDate
        .clone()
        .startOf('week')
        .add(i - Math.floor(ONCE_GENERATE_WEEKS_COUNT / 2), 'week');
    });
  }, [currentDate]);

  useLayoutEffect(() => {
    const activeIndex = weeks.findIndex((week) => week.isSame(currentDate, 'week'));
    if (activeIndex >= 0 && swiperRef) {
      setTimeout(() => {
        swiperRef.slideTo(activeIndex, 0, false);
      }, 100);
    }
  }, [currentDate, swiperRef, weeks]);

  const handleActiveIndexChange = useDebouncedCallback((swiper: SwiperClass) => {
    const activeWeek = weeks[swiper.activeIndex];
    onChange(activeWeek.clone().day(currentDate.day()).format(DATE_FORMAT));
  }, 200);

  // 处理点击日期事件
  const handleDateClick = useCallback(
    (dateString: string) => {
      onChange(dateString);
    },
    [onChange],
  );

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={setSwiperRef}
        className="w-full"
        preventInteractionOnTransition
        mousewheel
        modules={[Mousewheel]}
        onActiveIndexChange={handleActiveIndexChange}
        suppressHydrationWarning
      >
        {weeks.map((weekStartDate) => {
          const dates = Array.from({ length: 7 }, (_, i) => weekStartDate.clone().add(i, 'day'));
          const key = weekStartDate.format(DATE_FORMAT);
          return (
            <SwiperSlide key={key}>
              {({ isActive, isNext, isPrev }) => {
                if (!isActive && !isNext && !isPrev) {
                  return null;
                }
                return (
                  <div className="grid grid-cols-7">
                    {dates.map((date) => {
                      const dateString = date.format(DATE_FORMAT);
                      const isSelected = currentDateString === dateString;
                      // const isToday = date.isSame(dayjs(), 'day');
                      return (
                        <div
                          key={dateString}
                          onClick={() => handleDateClick(dateString)}
                          className={classNames('flex cursor-pointer flex-col items-center text-center', {
                            'text-brand-5':
                              date.toLunarDay().getTwelveStar().getEcliptic().getLuck().toString() === '吉',
                          })}
                          title={date.format('YYYY 年 M 月 D 日 / LMLD')}
                        >
                          <div className="text-grey-5 mb-1 text-xs">{date.format('ddd')}</div>
                          <div
                            className={classNames('mb-2 flex flex-col hover:font-black', {
                              'font-black': isSelected,
                            })}
                          >
                            <span className="text-xl">{date.format('D')}</span>
                            <span className="text-xs">{date.format('LD')}</span>
                          </div>
                          <ActiveMark active={isSelected} />
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        type="button"
        className={classNames(SWIPER_NAV_BUTTON_CLASS, '-left-6')}
        onClick={() => swiperRef?.slidePrev()}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className={classNames(SWIPER_NAV_BUTTON_CLASS, '-right-6')}
        onClick={() => swiperRef?.slideNext()}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
};
