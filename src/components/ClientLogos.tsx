'use client';

import { useTranslations } from 'next-intl';
import AnimateOnScroll from './AnimateOnScroll';

export default function ClientLogos() {
  const t = useTranslations('clients');

  return (
    <section className="bg-off-white border-y border-gray-200 py-8">
      <AnimateOnScroll direction="none">
        <div className="mx-auto max-w-7xl px-6 flex items-center gap-8 overflow-x-auto">
          <span className="text-gray-400 text-sm whitespace-nowrap font-medium">
            {t('label')}
          </span>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-24 h-12 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
