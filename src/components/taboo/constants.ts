export const TABOO_TYPE_MAP = {
  recommend: {
    text: '宜',
    theme: {
      full: 'bg-brand-5 text-white',
      simple: 'text-brand-5 border border-brand-5',
    },
  },
  avoid: {
    text: '忌',
    theme: {
      full: 'bg-black text-white',
      simple: 'text-black border border-black',
    },
  },
} as const;

export type TabooTheme = 'simple' | 'full';
export type TabooTypeKey = keyof typeof TABOO_TYPE_MAP;
