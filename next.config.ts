import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    TZ: 'Asia/Shanghai',
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
