'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimateOnScroll from './AnimateOnScroll';
import { portfolioProjects as staticProjects } from '@/data/portfolio';
import { getAll as getAllPortfolio } from '@/lib/services/portfolio';
import type { PortfolioProject } from '@/lib/types';
import type { Locale } from '@/i18n/config';

type Category = 'all' | 'websites' | 'marketing' | 'branding' | 'content';

const filterKeys: Category[] = ['all', 'websites', 'marketing', 'branding', 'content'];
const filterTranslationKeys: Record<Category, string> = {
  all: 'all',
  websites: 'websites',
  marketing: 'marketingFilter',
  branding: 'brandingFilter',
  content: 'contentFilter',
};

export default function PortfolioPreview() {
  const t = useTranslations('portfolio');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<Category>('all');
  const [projects, setProjects] = useState<PortfolioProject[]>(staticProjects);

  useEffect(() => {
    let cancelled = false;
    getAllPortfolio({ isFeatured: true })
      .then((fbProjects) => {
        if (!cancelled && fbProjects.length > 0) {
          setProjects(fbProjects);
        }
      })
      .catch((err) => {
        console.error('Firebase portfolio preview fetch failed, using static data:', err);
      });
    return () => { cancelled = true; };
  }, []);

  const displayProjects = active === 'all'
    ? projects.slice(0, 6)
    : projects.filter(p => p.category === active).slice(0, 6);

  return (
    <section className="bg-off-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-midnight">{t('title')}</h2>
              <p className="text-gray-600 mt-2">{t('subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterKeys.map(key => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`border border-gray-200 rounded-lg px-5 py-2 text-sm transition-colors ${
                    active === key ? 'bg-midnight text-white border-midnight' : 'text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {t(filterTranslationKeys[key])}
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.1}>
              <Link href={`/portfolio/${project.slug}`}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gray-100 h-[200px]" />
                  <div className="p-5">
                    <h4 className="font-bold text-midnight text-lg mb-3">{project.title[locale]}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-block border-2 border-midnight text-midnight px-8 py-3 rounded-full font-medium hover:bg-midnight hover:text-white transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
