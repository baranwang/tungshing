import { dayjs } from '@/utils/dayjs';
import { LuckText } from './luck-text';
import { AttributeDisplay } from './attribute-display';
import { Taboo } from './taboo';
import { memo } from 'react';

export interface DualHourAlmanacProps {
  dateString: string;
}

const formatDirection = (direction: string) => {
  const directions = {
    东: '正东',
    南: '正南',
    西: '正西',
    北: '正北',
  };
  return directions[direction as keyof typeof directions] || direction;
};

export const DualHourAlmanac = memo<DualHourAlmanacProps>(({ dateString }) => {
  const date = dayjs(dateString);
  const lunarHour = date.toLunarHour();
  const sixtyCycle = lunarHour.getSixtyCycle();
  const heavenStem = sixtyCycle.getHeavenStem();
  const earthBranch = sixtyCycle.getEarthBranch();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-black">
        {date.format('LH')} · <LuckText>{lunarHour.getTwelveStar().getEcliptic().getLuck().toString()}</LuckText>
      </div>

      <div className="flex flex-wrap gap-x-9 gap-y-4">
        <AttributeDisplay attribute="五行" value={sixtyCycle.getSound().toString()} />
        <AttributeDisplay
          attribute="冲煞"
          value={`冲${earthBranch.getOpposite().getZodiac()}煞${earthBranch.getOminous()}`}
        />
        <AttributeDisplay attribute="值神" value={lunarHour.getTwelveStar().toString()} />
        <AttributeDisplay attribute="喜神位" value={formatDirection(heavenStem.getJoyDirection().toString())} />
        <AttributeDisplay attribute="财神位" value={formatDirection(heavenStem.getWealthDirection().toString())} />
        <AttributeDisplay attribute="福神位" value={formatDirection(heavenStem.getMascotDirection().toString())} />
      </div>

      <Taboo time={lunarHour} theme="simple" />
    </div>
  );
});

DualHourAlmanac.displayName = 'DualHourAlmanac';
