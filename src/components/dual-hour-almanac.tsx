import { memo } from 'react';

import { AttributeDisplay } from './attribute-display';
import { LuckDisplay } from './luck-display';
import { Taboo } from './taboo';
import { DATE_FORMAT_WITH_TIME } from '@/lib/constants';
import { parseDateString } from '@/lib/utils';

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
  const date = parseDateString(dateString, DATE_FORMAT_WITH_TIME);
  if (!date) {
    return null;
  }
  const lunarHour = date.toLunarHour();
  const sixtyCycle = lunarHour.getSixtyCycle();
  const heavenStem = sixtyCycle.getHeavenStem();
  const earthBranch = sixtyCycle.getEarthBranch();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center">
        <span className="text-2xl font-black">{date.format('LH')}</span>
        <LuckDisplay
          time={lunarHour}
          className="ml-2 inline-flex size-6 items-center justify-center rounded-full border border-current text-sm"
        />
      </h2>

      <div className="flex flex-wrap gap-x-9 gap-y-4">
        <AttributeDisplay attribute="纳音" value={sixtyCycle.getSound().toString()} />
        <AttributeDisplay
          attribute="冲煞"
          value={`冲${earthBranch.getOpposite().getZodiac()}煞${earthBranch.getOminous()}`}
        />
        <AttributeDisplay attribute="星神" type="黄黑二道" value={lunarHour.getTwelveStar().toString()} />
        <AttributeDisplay attribute="喜神位" value={formatDirection(heavenStem.getJoyDirection().toString())} />
        <AttributeDisplay attribute="财神位" value={formatDirection(heavenStem.getWealthDirection().toString())} />
        <AttributeDisplay attribute="福神位" value={formatDirection(heavenStem.getMascotDirection().toString())} />
      </div>

      <Taboo time={lunarHour} theme="simple" />
    </div>
  );
});

DualHourAlmanac.displayName = 'DualHourAlmanac';
