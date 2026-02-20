'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const tierKeys = ['starter', 'growth', 'premium'] as const;

export default function PricingPage() {
  const t = useTranslations('pricingPage');

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-off-white py-20 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{t('title')}</h1>
              <p className="text-gray-600 text-lg">{t('subtitle')}</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="max-w-5xl mx-auto py-16 px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {tierKeys.map((tier, i) => {
              const isGrowth = tier === 'growth';
              const features = t.raw(`tiers.${tier}.features`) as string[];
              return (
                <AnimateOnScroll
                  key={tier}
                  variant="fadeUp"
                  delay={isGrowth ? 0.2 : i * 0.1}
                >
                  <div
                    className={`bg-white rounded-2xl p-8 text-center relative h-full ${
                      isGrowth
                        ? 'border-2 border-ruby'
                        : 'border border-gray-200'
                    }`}
                  >
                    {isGrowth && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ruby text-white text-sm px-4 py-1 rounded-full font-semibold">
                        {t('tiers.growth.popular')}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-midnight">{t(`tiers.${tier}.name`)}</h3>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-midnight">{t(`tiers.${tier}.price`)}</span>
                      <span className="text-lg text-gray-600 ms-1">{t(`tiers.${tier}.currency`)}</span>
                    </div>
                    <ul className="text-start mt-8 space-y-4">
                      {features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-8 w-full py-3 rounded-xl font-bold transition-colors ${
                        isGrowth
                          ? 'bg-ruby text-white hover:bg-ruby/90'
                          : 'border-2 border-gray-200 text-midnight hover:border-ruby'
                      }`}
                    >
                      {t(`tiers.${tier}.cta`)}
                    </button>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-5xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl font-bold text-midnight text-center mb-12">{t('faq.title')}</h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" staggerChildren={0.08}>
              {faqItems.map((item, i) => (
                <div key={i}>
                  <FAQAccordion items={[item]} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
