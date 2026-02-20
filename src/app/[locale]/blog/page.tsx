'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const filterKeys = ['all', 'marketing', 'development', 'design', 'business'] as const;

const blogPosts = [
  { title: 'أفضل استراتيجيات التسويق الرقمي لعام 2026', category: 'marketing', excerpt: 'تعرف على أحدث الاستراتيجيات التي تساعدك على تحقيق نتائج مبهرة في التسويق الرقمي.', date: '10 فبراير 2026', readTime: '5' },
  { title: 'كيف تصمم موقعاً يجذب العملاء', category: 'design', excerpt: 'أساسيات تصميم المواقع التي تحول الزوار إلى عملاء دائمين.', date: '8 فبراير 2026', readTime: '4' },
  { title: 'دليلك الشامل لتحسين محركات البحث SEO', category: 'development', excerpt: 'خطوات عملية لتحسين ترتيب موقعك في نتائج البحث وزيادة الزيارات العضوية.', date: '5 فبراير 2026', readTime: '8' },
  { title: 'إدارة شبكات التواصل الاجتماعي باحترافية', category: 'marketing', excerpt: 'نصائح وأدوات لإدارة حساباتك على منصات التواصل الاجتماعي بكفاءة.', date: '1 فبراير 2026', readTime: '6' },
  { title: 'بناء هوية بصرية قوية لعلامتك التجارية', category: 'business', excerpt: 'كيف تبني هوية بصرية متكاملة تميز علامتك التجارية عن المنافسين.', date: '28 يناير 2026', readTime: '5' },
  { title: 'استراتيجية المحتوى: من التخطيط إلى التنفيذ', category: 'business', excerpt: 'دليل عملي لبناء استراتيجية محتوى فعالة تحقق أهدافك التسويقية.', date: '25 يناير 2026', readTime: '7' },
];

export default function BlogPage() {
  const t = useTranslations('blogPage');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activePage, setActivePage] = useState(1);

  const filtered = activeFilter === 'all' ? blogPosts : blogPosts.filter(p => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-off-white py-20 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{t('title')}</h1>
            <p className="text-gray-600 text-lg">{t('subtitle')}</p>
          </div>
        </section>

        <section className="py-16 px-6">
          {/* Filter pills */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
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

          {/* Featured post */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap-8 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="md:w-2/5 w-full bg-gray-100 min-h-[300px]" />
              <div className="md:w-3/5 w-full p-8 flex flex-col justify-between">
                <div>
                  <span className="bg-ruby/10 text-ruby text-sm px-3 py-1 rounded-full font-semibold">{t('featured')}</span>
                  <h2 className="text-2xl font-bold text-midnight mt-4 mb-3">كيف تزيد مبيعاتك عبر التسويق الرقمي في 2026</h2>
                  <p className="text-gray-600 leading-relaxed">اكتشف أحدث الأساليب والأدوات في التسويق الرقمي التي يمكنها مضاعفة مبيعاتك وتوسيع قاعدة عملائك بشكل ملحوظ.</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-6">
                  <span>15 فبراير 2026</span>
                  <span>7 {t('minuteRead')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog grid */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <article key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                <div className="h-48 bg-gray-100" />
                <div className="p-6">
                  <span className="text-sm text-ruby font-semibold">{t(`filters.${post.category}`)}</span>
                  <h3 className="text-lg font-bold text-midnight mt-2 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
                    <span>{post.date}</span>
                    <span>{post.readTime} {t('minuteRead')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((page) => (
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
