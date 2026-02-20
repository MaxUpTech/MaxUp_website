'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimateOnScroll from './AnimateOnScroll';

type Category = 'all' | 'websites' | 'marketing' | 'branding' | 'content';

const projects = [
  { name: 'مطعم البيت العربي', tags: ['websites', 'branding'] as Category[], tagLabels: ['موقع', 'هوية بصرية'] },
  { name: 'عيادة د. سامي', tags: ['websites', 'marketing'] as Category[], tagLabels: ['موقع', 'SEO'] },
  { name: 'متجر زهور الربيع', tags: ['marketing', 'content'] as Category[], tagLabels: ['تسويق', 'محتوى'] },
];

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
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? projects : projects.filter(p => p.tags.includes(active));

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
          {filtered.map((project, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-gray-100 h-[200px]" />
                <div className="p-5">
                  <h4 className="font-bold text-midnight text-lg mb-3">{project.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tagLabels.map((label, j) => (
                      <span key={j} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
