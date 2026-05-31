"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    // Mevcut yolun başındaki eski dili kesip yeni dili ekliyoruz
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <select
      defaultValue={locale}
      disabled={isPending}
      onChange={(e) => onSelectChange(e.target.value)}
      className="bg-transparent border-none cursor-pointer uppercase font-bold text-[#D4AF37]"
    >
      <option value="en">EN</option>
      <option value="nl">NL</option>
      <option value="ar">AR</option>
    </select>
  );
}