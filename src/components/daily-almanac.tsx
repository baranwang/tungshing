import { memo, useMemo } from 'react';

import { AttributeDisplay } from './attribute-display';
import { CurrentTimeDisplay } from './current-time-display';
import { Explain } from './explain';
import { LuckDisplay } from './luck-display';
import { Taboo } from './taboo';
import { dayjs } from '@/lib/dayjs';
import { parseDateString } from '@/lib/utils';

export interface DailyAlmanacProps {
  dateString: string;
  renderSolarText?: (date: dayjs.Dayjs) => React.ReactNode;
}

export const DailyAlmanac = memo<DailyAlmanacProps>(({ dateString, renderSolarText }) => {
  const date = parseDateString(dateString);

  if (!date) {
    throw new Error('date is required');
  }

  const isToday = date.isSame(dayjs(), 'day');
  const lunarDate = date.toLunarDay();
  const sixtyCycle = lunarDate.getSixtyCycle();
  const earthBranch = sixtyCycle.getEarthBranch();
  const twentyEightStar = lunarDate.getTwentyEightStar();
  const gods = lunarDate.getGods().reduce(
    (acc, god) => {
      const category = god.getLuck().getName() === '吉' ? 'auspicious' : 'inauspicious';
      acc[category].push(god.getName());
      return acc;
    },
    { auspicious: [] as string[], inauspicious: [] as string[] },
  );

  const festival = useMemo(() => {
    const lunarFestival = lunarDate.getFestival();
    const termDay = lunarDate.getSolarDay().getTermDay();
    return lunarFestival?.getName() || (termDay.getDayIndex() === 0 ? termDay.getName() : '');
  }, [lunarDate]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <time className="text-brand-5">{renderSolarText?.(date) ?? date.format('YYYY 年 M 月 D 日 dddd')}</time>
        <h1 className="flex items-start">
          <time className="text-brand-5 flex items-center">
            <span className="text-4xl/relaxed font-black">{date.format('LMLD')}</span>
            {festival && <span className="ml-1 text-xs [writing-mode:vertical-rl]">〔 {festival} 〕</span>}
          </time>
          <LuckDisplay
            time={lunarDate}
            className="ml-2 inline-flex size-6 items-center justify-center rounded-full border text-sm"
          />
        </h1>
        <time className="text-grey-9 flex gap-2">
          <span>{date.format('LY年')}</span>
          <span>{lunarDate.getMonthSixtyCycle().toString()}月</span>
          <span>{sixtyCycle.toString()}日</span>
          {isToday && <CurrentTimeDisplay />}
        </time>
      </div>

      <Taboo time={lunarDate} theme="full" />

      <div className="flex flex-wrap gap-x-9 gap-y-4">
        <AttributeDisplay attribute="纳音" value={sixtyCycle.getSound().toString()} />
        <AttributeDisplay
          attribute="冲煞"
          value={`冲${earthBranch.getOpposite().getZodiac()}煞${earthBranch.getOminous()}`}
        />
        <AttributeDisplay attribute="值神" type="黄黑二道" value={lunarDate.getTwelveStar().toString()} />
        <AttributeDisplay attribute="月建十二神" value={lunarDate.getDuty().toString()} />
        <AttributeDisplay
          attribute="二十八星宿"
          value={
            <>
              <Explain type="二十八宿">{`${twentyEightStar}${twentyEightStar.getSevenStar()}${twentyEightStar.getAnimal()}`}</Explain>
              {' · '}
              {twentyEightStar.getLuck().toString()}
            </>
          }
        />
        <AttributeDisplay attribute="胎神" value={lunarDate.getFetusDay().toString()} />
        <AttributeDisplay attribute="吉神宜趋" type="神" value={gods.auspicious} />
        <AttributeDisplay attribute="凶神宜忌" type="神" value={gods.inauspicious} />
        <AttributeDisplay
          attribute="彭祖百忌"
          value={[
            sixtyCycle.getHeavenStem().getPengZuHeavenStem().toString(),
            earthBranch.getPengZuEarthBranch().toString(),
          ]}
        />
      </div>
    </>
  );
});

DailyAlmanac.displayName = 'DailyAlmanac';
