'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ProcessTimeline from '@/components/ProcessTimeline';
import CTABanner from '@/components/CTABanner';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getServiceBySlug } from '@/data/services';

type Locale = 'ar' | 'en' | 'he';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale() as Locale;
  const t = useTranslations('servicePage');
  const nav = useTranslations('nav');

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const title = service.title[locale];
  const fullDescription = service.fullDescription[locale];
  const bullets = service.bullets[locale];
  const shortDescription = service.shortDescription[locale];

  const processSteps = service.processSteps.map((step) => ({
    number: step.number,
    title: step.title[locale],
    description: step.description[locale],
  }));

  return (
    <>
      <Navbar />
      <main>
        {/* Hero + Breadcrumb */}
        <section className="bg-off-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumb
              items={[
                { label: nav('services'), href: '/services' },
                { label: title },
              ]}
            />
            <AnimateOnScroll variant="fadeUp" className="mt-6 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{shortDescription}</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-2xl font-bold text-midnight mb-8">{t('overview')}</h2>
            </AnimateOnScroll>
            <div className="flex flex-col lg:flex-row gap-12">
              <AnimateOnScroll variant="fadeUp" className="lg:w-[60%]">
                <p className="text-gray-600 leading-relaxed text-lg">{fullDescription}</p>
              </AnimateOnScroll>
              <AnimateOnScroll variant="fadeUp" delay={0.15} className="lg:w-[40%]">
                <div className="bg-off-white rounded-2xl p-8">
                  <h3 className="font-bold text-midnight mb-5 text-lg">{t('keyFeatures')}</h3>
                  <ul className="space-y-4">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-ruby mt-0.5 shrink-0">✓</span>
                        <span className="text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-midnight mb-4 text-center">
                {t('processTitle')}
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                {t('processSubtitle')}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" staggerChildren={0.12}>
              {processSteps.map((step, i) => (
                <div key={i}>
                  <ProcessTimeline steps={[step]} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-midnight mb-10 text-center">
                {t('whatYoullGet')}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="scaleUp" staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {service.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="bg-off-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-midnight mb-2">{item.title[locale]}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description[locale]}</p>
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-2xl md:text-3xl font-bold text-midnight mb-10 text-center">
                {t('relatedProjects')}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-gray-200 rounded-2xl h-[250px] flex items-center justify-center text-gray-400"
                >
                  {t('projectPlaceholder')}
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA */}
        <AnimateOnScroll variant="fadeUp" className="pt-16">
          <CTABanner />
        </AnimateOnScroll>
      </main>
      <Footer />
    </>
  );
}
