'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/BlogPostCard';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { blogPosts } from '@/data/blog-posts';

type Locale = 'ar' | 'en' | 'he';

const filterKeys = ['all', 'marketing', 'development', 'design', 'business'] as const;

const categoryLabels: Record<string, Record<Locale, string>> = {
  marketing: { ar: 'تسويق', en: 'Marketing', he: 'שיווק' },
  design: { ar: 'تصميم', en: 'Design', he: 'עיצוב' },
  development: { ar: 'تطوير', en: 'Development', he: 'פיתוח' },
  business: { ar: 'أعمال', en: 'Business', he: 'עסקים' },
};

export default function BlogPage() {
  const t = useTranslations('blogPage');
  const locale = useLocale() as Locale;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activePage, setActivePage] = useState(1);

  const published = blogPosts.filter((p) => p.status === 'published');
  const filtered = activeFilter === 'all' ? published : published.filter((p) => p.category === activeFilter);

  const featured = published[0];

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString(
      locale === 'ar' ? 'ar-EG' : locale === 'he' ? 'he-IL' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

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

        <section className="py-16 px-6">
          {/* Filter pills */}
          <AnimateOnScroll variant="fadeUp">
            <div className="flex gap-3 justify-center mb-12 flex-wrap">
              {filterKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => { setActiveFilter(key); setActivePage(1); }}
                  className={`px-6 py-2 rounded-lg border font-semibold cursor-pointer transition-colors ${
                    activeFilter === key
                      ? 'bg-midnight text-white border-midnight'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {t(`filters.${key}`)}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Featured post */}
          {featured && activeFilter === 'all' && (
            <AnimateOnScroll variant="fadeUp" className="max-w-6xl mx-auto mb-16">
              <a href={`/${locale}/blog/${featured.slug}`} className="block">
                <div className="flex flex-col md:flex-row gap-8 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
                  <div className="md:w-2/5 w-full bg-gray-100 min-h-[300px]" />
                  <div className="md:w-3/5 w-full p-8 flex flex-col justify-between">
                    <div>
                      <span className="bg-ruby/10 text-ruby text-sm px-3 py-1 rounded-full font-semibold">{t('featured')}</span>
                      <h2 className="text-2xl font-bold text-midnight mt-4 mb-3">{featured.title[locale]}</h2>
                      <p className="text-gray-600 leading-relaxed">{featured.excerpt[locale]}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-6">
                      <span>{formattedDate(featured.publishDate)}</span>
                      <span>{featured.readTime} {t('minuteRead')}</span>
                    </div>
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
          )}

          {/* Blog grid */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <BlogPostCard
                    post={{
                      slug: post.slug,
                      title: post.title[locale],
                      excerpt: post.excerpt[locale],
                      category: categoryLabels[post.category]?.[locale] ?? post.category,
                      date: formattedDate(post.publishDate),
                      readTime: post.readTime,
                      featuredImage: post.featuredImage,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            {[1].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center font-semibold transition-colors ${
                  activePage === page
                    ? 'bg-midnight text-white border-midnight'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
