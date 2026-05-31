import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl eklentisini oluştur
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

// nextConfig'i eklenti ile sarmalayarak dışa aktar
export default withNextIntl(nextConfig);