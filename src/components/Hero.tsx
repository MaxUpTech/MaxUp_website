'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Content */}
        <div className="flex-1 space-y-8">
          <span className="inline-block bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
            {t('badge')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight leading-tight">
            {t('title1')}
            <br />
            <span className="text-ruby">{t('title2')}</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-ruby text-white px-7 py-3.5 rounded-xl font-medium hover:bg-ruby/90 transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/portfolio"
              className="border border-gray-200 text-midnight px-7 py-3.5 rounded-xl font-medium hover:border-ruby hover:text-ruby transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-midnight">200+</div>
              <div className="text-gray-400 text-sm">{t('statProjects')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight">5+</div>
              <div className="text-gray-400 text-sm">{t('statYears')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight">98%</div>
              <div className="text-gray-400 text-sm">{t('statSatisfaction')}</div>
            </div>
          </div>
        </div>

        {/* 3D Placeholder */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 rounded-2xl min-h-[440px] w-full">
          <span className="text-gray-400 text-lg">Spline 3D Scene</span>
        </div>
      </div>
    </section>
  );
}
