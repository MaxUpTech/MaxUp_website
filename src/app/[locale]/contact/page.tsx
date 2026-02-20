'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const serviceOptionKeys = ['webDev', 'marketing', 'content', 'branding', 'social', 'seo'] as const;

export default function ContactPage() {
  const t = useTranslations('contactPage');

  const inputClass = 'w-full border border-gray-200 rounded-xl p-4 mb-4 focus:border-ruby focus:ring-1 focus:ring-ruby focus:outline-none';

  return (
    <>
      <Navbar />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <AnimateOnScroll variant="fadeLeft">
              <div>
                <h1 className="text-4xl font-bold text-midnight mb-4">{t('title')}</h1>
                <p className="text-gray-600 mb-10 leading-relaxed">{t('subtitle')}</p>

                <div className="space-y-6 mb-10">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5-9.75-6.5" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{t('info.email')}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{t('info.phone')}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{t('info.location')}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-sm">
                      ●
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right - Form */}
            <AnimateOnScroll variant="fadeRight" delay={0.15}>
              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder={t('form.name')} className={inputClass} />
                  <input type="email" placeholder={t('form.email')} className={inputClass} />
                  <input type="tel" placeholder={t('form.phone')} className={inputClass} />
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>{t('form.serviceType')}</option>
                    {serviceOptionKeys.map((key) => (
                      <option key={key} value={key}>{t(`serviceOptions.${key}`)}</option>
                    ))}
                  </select>
                  <textarea placeholder={t('form.message')} className={`${inputClass} h-32 resize-none`} />
                  <button type="submit" className="w-full bg-ruby text-white py-4 rounded-xl font-bold hover:bg-ruby/90 transition-colors">
                    {t('form.submit')}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Map Placeholder */}
          <AnimateOnScroll variant="fadeUp" delay={0.3} className="mx-auto max-w-6xl px-6 mt-16">
            <div className="bg-gray-100 rounded-2xl h-[300px] flex items-center justify-center text-gray-400">
              {t('mapPlaceholder')}
            </div>
          </AnimateOnScroll>
        </section>
      </main>
      <Footer />
    </>
  );
}
