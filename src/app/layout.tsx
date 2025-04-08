import { GoogleAnalytics } from '@next/third-parties/google';
import { Noto_Serif_SC } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

const notoSerifSC = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  weight: ['400', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '万年历',
  description: '万年历 - 查看每日吉凶宜忌、黄道吉日、农历信息',
  keywords: ['万年历', '黄历', '通书', '通胜', '农历', '吉凶', '宜忌', '传统文化', '黄道吉日'],
  authors: [{ name: 'baranwang', url: 'https://github.com/baranwang' }],
  creator: 'baranwang',
  publisher: 'baranwang',
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '万年历',
  },
  openGraph: {
    title: '万年历 - 传统万年历查询',
    description: '查看每日吉凶宜忌、黄道吉日、农历信息',
    siteName: '万年历',
    locale: 'zh_Hans',
    type: 'website',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  twitter: {
    card: 'summary',
    title: '万年历 - 传统万年历查询',
    description: '查看每日吉凶宜忌、黄道吉日、农历信息',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={notoSerifSC.variable}>
      <body className="text-grey-9">{children}</body>
      <GoogleAnalytics gaId="G-YNS5W7Q09M" />
    </html>
  );
}
