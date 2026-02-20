'use client';

import { useTranslations } from 'next-intl';

export default function AboutTeaser() {
  const t = useTranslations('about');

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="bg-gray-100 rounded-2xl w-full md:w-[400px] h-[340px] flex-shrink-0" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-4">{t('title')}</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{t('description')}</p>
          <button className="bg-ruby text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
