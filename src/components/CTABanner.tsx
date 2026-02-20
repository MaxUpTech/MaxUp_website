'use client';

import { useTranslations } from 'next-intl';

export default function CTABanner() {
  const t = useTranslations('cta');

  return (
    <section className="px-6 mb-20">
      <div className="bg-midnight rounded-3xl mx-auto max-w-6xl text-center py-16 px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">{t('subtitle')}</p>
        <button className="bg-ruby text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
          {t('button')}
        </button>
      </div>
    </section>
  );
}
