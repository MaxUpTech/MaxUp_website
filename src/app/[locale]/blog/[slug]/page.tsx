import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import RichTextRenderer from '@/components/RichTextRenderer';
import ShareButtons from '@/components/ShareButtons';
import BlogPostCard from '@/components/BlogPostCard';
import { BlogHeader, BlogBody, BlogSection } from './BlogPostContent';
import { getBlogPost, getRelatedPosts, blogPosts } from '@/data/blog-posts';

type Locale = 'ar' | 'en' | 'he';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export function generateStaticParams() {
  return blogPosts
    .filter((p) => p.status === 'published')
    .map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blogPost');
  const navT = await getTranslations('nav');

  const related = getRelatedPosts(slug, post.category, 3);
  const relatedPosts =
    related.length >= 3
      ? related
      : [
          ...related,
          ...blogPosts
            .filter((p) => p.slug !== slug && !related.includes(p) && p.status === 'published')
            .slice(0, 3 - related.length),
        ];

  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : locale === 'he' ? 'he-IL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const categoryLabels: Record<string, Record<Locale, string>> = {
    marketing: { ar: 'تسويق', en: 'Marketing', he: 'שיווק' },
    design: { ar: 'تصميم', en: 'Design', he: 'עיצוב' },
    development: { ar: 'تطوير', en: 'Development', he: 'פיתוח' },
    business: { ar: 'أعمال', en: 'Business', he: 'עסקים' },
  };

  const categoryLabel = categoryLabels[post.category]?.[locale] ?? post.category;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-off-white py-4">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumb
              items={[
                { label: locale === 'ar' ? 'الرئيسية' : locale === 'he' ? 'דף הבית' : 'Home', href: '/' },
                { label: navT('blog'), href: '/blog' },
                { label: post.title[locale] },
              ]}
            />
          </div>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-6 py-12">
          <BlogHeader>
            <div className="mb-8">
              <span className="inline-block bg-ruby text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                {categoryLabel}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight leading-tight mb-6">
                {post.title[locale]}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-midnight">{post.author.name}</span>
                  <span>·</span>
                  <span>{formattedDate}</span>
                  <span>·</span>
                  <span>{post.readTime} {locale === 'ar' ? 'دقائق للقراءة' : locale === 'he' ? 'דקות קריאה' : 'min read'}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-[300px] md:h-[400px] bg-gray-100 rounded-2xl mb-12" />
          </BlogHeader>

          {/* Article Body */}
          <BlogBody>
            <div className="mb-12">
              <RichTextRenderer content={post.content[locale]} />
            </div>

            {/* Share */}
            <div className="border-t border-gray-200 pt-8 mb-16">
              <h3 className="text-lg font-semibold text-midnight mb-4">{t('shareTitle')}</h3>
              <ShareButtons url={`https://maxup.media/${locale}/blog/${post.slug}`} title={post.title[locale]} />
            </div>
          </BlogBody>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-off-white py-16">
            <div className="mx-auto max-w-6xl px-6">
              <BlogSection>
                <h2 className="text-2xl md:text-3xl font-bold text-midnight mb-10 text-center">
                  {t('relatedArticles')}
                </h2>
              </BlogSection>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rp) => (
                  <BlogSection key={rp.id}>
                    <BlogPostCard
                      post={{
                        slug: rp.slug,
                        title: rp.title[locale],
                        excerpt: rp.excerpt[locale],
                        category: categoryLabels[rp.category]?.[locale] ?? rp.category,
                        date: new Date(rp.publishDate).toLocaleDateString(
                          locale === 'ar' ? 'ar-EG' : locale === 'he' ? 'he-IL' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        ),
                        readTime: rp.readTime,
                        featuredImage: rp.featuredImage,
                      }}
                    />
                  </BlogSection>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
