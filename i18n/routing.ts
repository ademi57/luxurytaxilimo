import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Desteklenen dillerinizi buraya ekleyin
  locales: ['en', 'nl', 'ar'],
  defaultLocale: 'en'
});

// Link bileşenini bu dosyadan dışa aktarıyoruz
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
