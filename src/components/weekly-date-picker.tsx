import { useMemo, useCallback } from 'react';

import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DATE_FORMAT } from '@/lib/constants';
import { dayjs } from '@/lib/dayjs';

import 'swiper/css';
import classNames from 'classnames';

export interface WeeklyDatePickerProps {
  currentDateString: string;
  onChange: (dateString: string) => void;
}

export const WeeklyDatePicker: React.FC<WeeklyDatePickerProps> = ({ currentDateString, onChange }) => {
  const currentDate = useMemo(() => dayjs(currentDateString), [currentDateString]);

  // 生成前后各60天的日期数据（约8-9周）
  const dates = useMemo(() => {
    const result = [];
    const startDate = currentDate.clone().subtract(30, 'day');

    for (let i = 0; i < 90; i++) {
      const date = startDate.clone().add(i, 'day');
      result.push(date);
    }

    return result;
  }, [currentDate]);

  // 查找当前日期的索引
  const initialIndex = useMemo(() => {
    return dates.findIndex((date) => date.format(DATE_FORMAT) === currentDateString);
  }, [dates, currentDateString]);

  // 处理点击日期事件
  const handleDateClick = useCallback(
    (dateString: string) => {
      onChange(dateString);
    },
    [onChange],
  );

  return (
    <Swiper
      className="w-full"
      mousewheel
      modules={[Mousewheel]}
      slidesPerView={7}
      slidesPerGroup={7}
      centeredSlides={false}
      initialSlide={Math.max(0, initialIndex - (initialIndex % 7))}
      spaceBetween={0}
    >
      {dates.map((date) => {
        const dateString = date.format(DATE_FORMAT);
        const isSelected = currentDateString === dateString;

        return (
          <SwiperSlide key={dateString}>
            <div
              onClick={() => handleDateClick(dateString)}
              className={`flex cursor-pointer flex-col items-center justify-center p-2`}
            >
              <div className="text-xs">{date.format('ddd')}</div>
              <div
                className={classNames('rounded-full', {
                  'font-black': isSelected,
                })}
              >
                {date.format('DD')}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
