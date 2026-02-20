'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';
import { FormSkeleton } from '@/components/admin/LoadingSkeleton';
import { useToast } from '@/components/admin/Toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import * as blogService from '@/lib/services/blog';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

const categories = ['Marketing', 'Development', 'Design', 'Business', 'SEO'];
const authors = ['MaxUp Team', 'Ahmad Khalil', 'Sarah Cohen', 'Yael Levy'];

const toolbarButtons = [
  { label: 'B', title: 'Bold' },
  { label: 'I', title: 'Italic' },
  { label: 'H2', title: 'Heading 2' },
  { label: 'H3', title: 'Heading 3' },
  { label: '• List', title: 'Unordered List' },
  { label: '🔗', title: 'Link' },
  { label: '🖼', title: 'Image' },
  { label: '❝', title: 'Quote' },
  { label: '</>', title: 'Code' },
];

export default function PostEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { upload, uploading } = useFileUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const postId = params?.id as string | undefined;
  const isNew = !postId || postId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [locale, setLocale] = useState('ar');
  const [title, setTitle] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [content, setContent] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [excerpt, setExcerpt] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [status, setStatus] = useState('Draft');
  const [category, setCategory] = useState('Marketing');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('MaxUp Team');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [seoOpen, setSeoOpen] = useState(false);
  const [metaTitle, setMetaTitle] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [metaDesc, setMetaDesc] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [slug, setSlug] = useState('');

  const dir = locale === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const post = await blogService.getById(postId!);
        if (post) {
          setTitle(post.title || { ar: '', en: '', he: '' });
          setContent(post.content || { ar: '', en: '', he: '' });
          setExcerpt(post.excerpt || { ar: '', en: '', he: '' });
          setFeaturedImage(post.featuredImage || '');
          setStatus(post.status === 'published' ? 'Published' : 'Draft');
          setCategory(post.category || 'Marketing');
          setTags(post.tags || []);
          setAuthor(post.author?.name || 'MaxUp Team');
          setSlug(post.slug || '');
          if (post.publishDate?.toDate) {
            setPublishDate(post.publishDate.toDate().toISOString().split('T')[0]);
          }
          if (post.seo) {
            setMetaTitle(post.seo.metaTitle || { ar: '', en: '', he: '' });
            setMetaDesc(post.seo.metaDescription || { ar: '', en: '', he: '' });
          }
        }
      } catch {
        showToast('error', 'Failed to load post');
      }
      setLoading(false);
    })();
  }, [postId, isNew]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await upload(file, 'blog');
      setFeaturedImage(url);
      showToast('success', 'Image uploaded');
    } catch {
      showToast('error', 'Image upload failed');
    }
  };

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    setSaving(true);
    try {
      const postSlug = slug || title.en?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `post-${Date.now()}`;
      const data: any = {
        slug: postSlug,
        title,
        excerpt,
        content,
        featuredImage,
        category,
        tags,
        author: { name: author, avatar: '' },
        status: publishStatus,
        publishDate: Timestamp.fromDate(new Date(publishDate)),
        readTime: Math.ceil((content.en?.split(' ').length || 0) / 200) || 1,
        seo: { metaTitle: metaTitle, metaDescription: metaDesc },
      };

      if (isNew) {
        await blogService.create(data);
        showToast('success', publishStatus === 'published' ? 'Post published' : 'Draft saved');
      } else {
        await blogService.update(postId!, data);
        showToast('success', 'Post updated');
      }
      router.push('/admin/posts');
    } catch {
      showToast('error', 'Failed to save post');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="ms-64">
          <TopBar title="Edit Post" />
          <main className="p-6"><FormSkeleton /></main>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title={isNew ? 'New Blog Post' : 'Edit Blog Post'} />
        <main className="p-6">
          <div className="mb-6">
            <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
          </div>

          <div className="flex gap-6">
            <div className="flex-1 min-w-0 space-y-5" style={{ flex: '7' }}>
              <input type="text" placeholder="Post title..." value={title[locale] || ''} onChange={(e) => setTitle({ ...title, [locale]: e.target.value })} dir={dir} className="w-full px-5 py-4 text-2xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby bg-white" />

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl bg-white overflow-hidden cursor-pointer hover:border-ruby/40 transition-colors">
                {uploading ? (
                  <div className="h-48 flex items-center justify-center"><p className="text-sm text-ruby">Uploading...</p></div>
                ) : featuredImage ? (
                  <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                    <img src={featuredImage} alt="Featured" className="max-h-full max-w-full object-contain" />
                    <p className="absolute bottom-2 text-xs text-gray-400">Click to change</p>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm text-gray-400">Drop featured image or click to upload</p>
                    <p className="text-xs text-gray-300 mt-1">Recommended: 1200 × 630px</p>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap">
                  {toolbarButtons.map((btn) => (
                    <button key={btn.title} title={btn.title} className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer">{btn.label}</button>
                  ))}
                </div>
                <textarea value={content[locale] || ''} onChange={(e) => setContent({ ...content, [locale]: e.target.value })} dir={dir} rows={18} placeholder="Write your blog post content here..." className="w-full p-4 text-sm font-mono text-gray-700 focus:outline-none resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => handleSave('draft')} disabled={saving} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-midnight hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>
                <button onClick={() => handleSave('published')} disabled={saving} className="px-6 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors cursor-pointer disabled:opacity-50">
                  {saving ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>

            <div className="space-y-5" style={{ flex: '3' }}>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-from-title" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20" />
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {tag}
                      <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="text-gray-400 hover:text-red-500 cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
                <input type="text" placeholder="Type tag + Enter..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20" />
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Author</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  {authors.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Publish Date</label>
                <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20" />
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <button onClick={() => setSeoOpen(!seoOpen)} className="flex items-center justify-between w-full text-sm font-medium text-midnight cursor-pointer">
                  SEO Settings
                  <svg className={`w-4 h-4 transition-transform ${seoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {seoOpen && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Meta Title ({locale.toUpperCase()})</label>
                      <input type="text" value={metaTitle[locale] || ''} onChange={(e) => setMetaTitle({ ...metaTitle, [locale]: e.target.value })} placeholder={title[locale] || 'Post title'} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Meta Description ({locale.toUpperCase()})</label>
                      <textarea value={metaDesc[locale] || ''} onChange={(e) => setMetaDesc({ ...metaDesc, [locale]: e.target.value })} rows={3} placeholder="Brief description for search engines..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 resize-none" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <p className="text-xs text-gray-400 mb-2 font-medium">Search Preview</p>
                      <p className="text-sm text-blue-700 font-medium truncate">{metaTitle[locale] || title[locale] || 'Page Title'}</p>
                      <p className="text-xs text-green-700 truncate">maxup.co.il/blog/{slug || 'post-slug'}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{metaDesc[locale] || 'Meta description will appear here...'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
