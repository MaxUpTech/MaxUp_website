'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const serviceKeys = ['webDev', 'marketing', 'content', 'branding', 'social', 'seo'] as const;

const serviceSlugMap: Record<string, string> = {
  webDev: 'web-design',
  marketing: 'marketing',
  content: 'content',
  branding: 'branding',
  social: 'social-media',
  seo: 'seo',
};

export default function ServicesPage() {
  const t = useTranslations('servicesPage');
  const nav = useTranslations('nav');

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-off-white py-20 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{t('heroTitle')}</h1>
              <p className="text-gray-600 text-lg">{t('heroSubtitle')}</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Service Sections */}
        {serviceKeys.map((key, i) => {
          const isEven = i % 2 === 1;
          const bullets: string[] = t.raw(`services.${key}.bullets`);

          return (
            <section key={key} className={i % 2 === 0 ? 'py-16' : 'py-16 bg-off-white'}>
              <div className={`mx-auto max-w-6xl px-6 flex flex-col lg:flex-row gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <AnimateOnScroll variant={isEven ? 'fadeRight' : 'fadeLeft'} className="flex-1">
                  <h2 className="text-3xl font-bold text-midnight mb-4">
                    {t(`services.${key}.title`)}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t(`services.${key}.description`)}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {bullets.map((bullet: string, j: number) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-ruby mt-0.5">✓</span>
                        <span className="text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${serviceSlugMap[key]}`}
                    className="inline-block bg-ruby text-white rounded-lg px-8 py-3 font-medium hover:bg-ruby/90 transition-colors"
                  >
                    {t(`services.${key}.cta`)}
                  </Link>
                </AnimateOnScroll>

                {/* Image Placeholder */}
                <AnimateOnScroll variant={isEven ? 'fadeLeft' : 'fadeRight'} delay={0.15} className="flex-1 w-full">
                  <div className="bg-gray-100 rounded-2xl h-[300px] flex items-center justify-center text-gray-400">
                    {t(`services.${key}.title`)}
                  </div>
                </AnimateOnScroll>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
