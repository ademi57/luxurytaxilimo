import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Desteklenen diller
  locales: ['en', 'nl', 'ar'],
  // Kullanıcı ana sayfaya (localhost:3000) gelirse hangi dile yönlendirilsin?
  defaultLocale: 'en'
});

export const config = {
  // Sadece dil parametresi içermeyen rotaları eşle
  // '/((?!api|_next|_vercel|.*\\..*).*)' ifadesi statik dosyaları dışarıda tutar
  matcher: ['/', '/(en|nl|ar)/:path*']
};