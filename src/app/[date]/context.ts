'use client';

import { createContext } from 'react';

export const DateContext = createContext<{
  dateString: string;
}>({
  dateString: '',
});
