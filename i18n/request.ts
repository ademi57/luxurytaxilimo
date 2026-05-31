import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Locale değerini çözümlüyoruz
  let locale = await requestLocale;

  // Varsayılan dil (fallback)
  if (!locale) {
    locale = 'en';
  }

  return {
    locale,
    // JSON dosyalarının olduğu klasör yolu: 
    // Dosya i18n/ içindeyse, messages/ bir üst dizindedir.
    messages: (await import(`../messages/${locale}.json`)).default
  };
});