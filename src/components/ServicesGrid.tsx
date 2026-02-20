'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimateOnScroll from './AnimateOnScroll';
import { services as staticServices, type ServiceData } from '@/data/services';
import { getAll as getAllServices } from '@/lib/services/services';
import type { Service } from '@/lib/types';
import type { Locale } from '@/i18n/config';
import type { ReactNode } from 'react';

// Static icon map by slug
const iconMap: Record<string, ReactNode> = {
  'web-design': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  'marketing': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  ),
  'content': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  'branding': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  'social-media': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  'seo': (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

function getIcon(slug: string): ReactNode {
  return iconMap[slug] || (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

interface DisplayService {
  slug: string;
  title: string;
  description: string;
}

export default function ServicesGrid() {
  const t = useTranslations('services');
  const locale = useLocale() as Locale;
  const [dynamicServices, setDynamicServices] = useState<DisplayService[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAllServices({ isActive: true })
      .then((fbServices) => {
        if (!cancelled && fbServices.length > 0) {
          setDynamicServices(
            fbServices.map((s) => ({
              slug: s.slug,
              title: s.title[locale] || s.title.en,
              description: s.shortDescription[locale] || s.shortDescription.en,
            }))
          );
        }
      })
      .catch((err) => {
        console.error('Firebase services fetch failed, using translations:', err);
      });
    return () => { cancelled = true; };
  }, [locale]);

  // If we have dynamic services from Firebase, render those
  if (dynamicServices) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-4">{t('title')}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicServices.map((svc, index) => (
              <AnimateOnScroll key={svc.slug} delay={index * 0.1}>
                <div className="border border-gray-200 rounded-2xl p-9 hover:border-ruby hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-midnight mb-6">
                    {getIcon(svc.slug)}
                  </div>
                  <h3 className="text-lg font-bold text-midnight mb-3">{svc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{svc.description}</p>
                  <Link href={`/services/${svc.slug}`} className="text-ruby text-sm font-medium hover:underline">
                    {t('learnMore')} ←
                  </Link>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: use translation keys (original behavior)
  const staticKeys = ['webDev', 'marketing', 'content', 'branding', 'social', 'seo'] as const;
  const staticSlugs = ['web-design', 'marketing', 'content', 'branding', 'social-media', 'seo'];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-4">{t('title')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticKeys.map((key, index) => (
            <AnimateOnScroll key={key} delay={index * 0.1}>
              <div className="border border-gray-200 rounded-2xl p-9 hover:border-ruby hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-midnight mb-6">
                  {getIcon(staticSlugs[index])}
                </div>
                <h3 className="text-lg font-bold text-midnight mb-3">{t(key)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t(`${key}Desc`)}</p>
                <Link href={`/services/${staticSlugs[index]}`} className="text-ruby text-sm font-medium hover:underline">
                  {t('learnMore')} ←
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
