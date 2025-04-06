import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '万年历 - 传统黄历查询',
    short_name: '万年历',
    description: '查看每日吉凶宜忌、黄道吉日、农历信息',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF6F2',
    theme_color: '#FDF6F2',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
