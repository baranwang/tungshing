export const TABOO_TEXT_MAP = {
  recommend: '宜',
  avoid: '忌',
} as const;

export type TabooTheme = 'simple' | 'full';
export type TabooTypeKey = keyof typeof TABOO_TEXT_MAP;
