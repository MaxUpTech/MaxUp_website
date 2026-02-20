'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterPills from '@/components/FilterPills';
import ProjectCard from '@/components/ProjectCard';
import { portfolioProjects } from '@/data/portfolio';
import type { Locale } from '@/i18n/config';

const INITIAL_COUNT = 6;

export default function PortfolioPage() {
  const t = useTranslations('portfolioPage');
  const locale = useLocale() as Locale;
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filters = [
    { key: 'all', label: t('filters.all') },
    { key: 'websites', label: t('filters.websites') },
    { key: 'marketing', label: t('filters.marketing') },
    { key: 'branding', label: t('filters.branding') },
    { key: 'content', label: t('filters.content') },
    { key: 'apps', label: t('filters.apps') },
  ];

  const filtered = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-off-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{t('title')}</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-12">
              <FilterPills
                filters={filters}
                activeFilter={activeFilter}
                onFilterChange={(key) => { setActiveFilter(key); setVisibleCount(INITIAL_COUNT); }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    slug: project.slug,
                    title: project.title[locale],
                    category: project.category,
                    heroImage: project.heroImage,
                  }}
                />
              ))}
            </div>

            {visible.length < filtered.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="border-2 border-midnight text-midnight px-8 py-3 rounded-full font-medium hover:bg-midnight hover:text-white transition-colors"
                >
                  {t('loadMore')}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
