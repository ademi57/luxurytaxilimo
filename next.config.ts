import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Dosya yolunu açıkça belirtiyoruz
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);