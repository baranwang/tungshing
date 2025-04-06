import { dayjs } from '@/utils/dayjs';
import { memo, useMemo } from 'react';
import { AttributeDisplay } from './attribute-display';
import { CurrentTimeDisplay } from './current-time-display';
import { Taboo } from './taboo';

export interface DailyAlmanacProps {
  dateString?: string;
  renderSolarText?: (date: dayjs.Dayjs) => React.ReactNode;
}

export const DailyAlmanac = memo<DailyAlmanacProps>(({ dateString, renderSolarText }) => {
  const date = useMemo(() => dayjs(dateString), [dateString]);
  const isToday = useMemo(() => date.isSame(dayjs(), 'day'), [date]);
  const lunarDate = useMemo(() => date.toLunarDay(), [date]);
  const sixtyCycle = useMemo(() => lunarDate.getSixtyCycle(), [lunarDate]);
  const earthBranch = useMemo(() => sixtyCycle.getEarthBranch(), [sixtyCycle]);
  const twentyEightStar = useMemo(() => lunarDate.getTwentyEightStar(), [lunarDate]);
  const gods = useMemo(() => {
    return lunarDate.getGods().reduce(
      (acc, god) => {
        const category = god.getLuck().getName() === '吉' ? 'auspicious' : 'inauspicious';
        acc[category].push(god.getName());
        return acc;
      },
      { auspicious: [] as string[], inauspicious: [] as string[] },
    );
  }, [lunarDate]);

  const pengZuInfo = useMemo(
    () => [sixtyCycle.getHeavenStem().getPengZuHeavenStem().toString(), earthBranch.getPengZuEarthBranch().toString()],
    [sixtyCycle, earthBranch],
  );

  const solarText = useMemo(
    () => renderSolarText?.(date) ?? date.format('YYYY 年 M 月 D 日 dddd'),
    [date, renderSolarText],
  );

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="text-brand-5">{solarText}</div>
        <div className="text-brand-5 text-4xl font-black">{date.format('LMLD')}</div>
        <div className="flex gap-2 text-black">
          <span>{date.format('LY年')}</span>
          <span>{lunarDate.getMonthSixtyCycle().toString()}月</span>
          <span>{sixtyCycle.toString()}日</span>
          {isToday && <CurrentTimeDisplay />}
        </div>
      </div>

      <Taboo time={lunarDate} theme="full" />

      <div className="flex flex-wrap gap-x-9 gap-y-4">
        <AttributeDisplay attribute="五行" value={sixtyCycle.getSound().toString()} />
        <AttributeDisplay
          attribute="冲煞"
          value={`冲${earthBranch.getOpposite().getZodiac()}煞${earthBranch.getOminous()}`}
        />
        <AttributeDisplay attribute="值神" value={lunarDate.getTwelveStar().toString()} />
        <AttributeDisplay attribute="建除十二神" value={lunarDate.getDuty().toString()} />
        <AttributeDisplay
          attribute="二十八星宿"
          value={`${twentyEightStar}${twentyEightStar.getSevenStar()}${twentyEightStar.getAnimal()} · ${twentyEightStar.getLuck()}`}
        />
        <AttributeDisplay attribute="胎神" value={lunarDate.getFetusDay().toString()} />
        <AttributeDisplay attribute="吉神宜趋" value={gods.auspicious} />
        <AttributeDisplay attribute="凶神宜忌" value={gods.inauspicious} />
        <AttributeDisplay attribute="彭祖百忌" value={pengZuInfo} />
      </div>
    </>
  );
});

DailyAlmanac.displayName = 'DailyAlmanac';
