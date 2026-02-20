'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';
import { useState } from 'react';

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

export default function NewPostPage() {
  const [locale, setLocale] = useState('ar');
  const [title, setTitle] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [content, setContent] = useState<Record<string, string>>({ ar: '', en: '', he: '' });
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState('Draft');
  const [category, setCategory] = useState('Marketing');
  const [tags, setTags] = useState<string[]>(['SEO', 'تسويق']);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('MaxUp Team');
  const [publishDate, setPublishDate] = useState('2026-02-21');
  const [seoOpen, setSeoOpen] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const handleImageUpload = () => {
    setFeaturedImage('/placeholder-blog.jpg');
  };

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="New Blog Post" />
        <main className="p-6">
          <div className="mb-6">
            <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
          </div>

          <div className="flex gap-6">
            {/* Main Content — 70% */}
            <div className="flex-1 min-w-0 space-y-5" style={{ flex: '7' }}>
              {/* Title */}
              <input
                type="text"
                placeholder="Post title..."
                value={title[locale] || ''}
                onChange={(e) => setTitle({ ...title, [locale]: e.target.value })}
                dir={dir}
                className="w-full px-5 py-4 text-2xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby bg-white"
              />

              {/* Featured Image */}
              <div
                onClick={handleImageUpload}
                className="border-2 border-dashed border-gray-200 rounded-xl bg-white overflow-hidden cursor-pointer hover:border-ruby/40 transition-colors"
              >
                {featuredImage ? (
                  <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-sm text-green-600 font-medium">Image uploaded</p>
                      <p className="text-xs text-gray-400 mt-1">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm text-gray-400">Drop featured image or click to upload</p>
                    <p className="text-xs text-gray-300 mt-1">Recommended: 1200 × 630px</p>
                  </div>
                )}
              </div>

              {/* Rich Text Editor */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap">
                  {toolbarButtons.map((btn) => (
                    <button
                      key={btn.title}
                      title={btn.title}
                      className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <textarea
                  value={content[locale] || ''}
                  onChange={(e) => setContent({ ...content, [locale]: e.target.value })}
                  dir={dir}
                  rows={18}
                  placeholder="Write your blog post content here..."
                  className="w-full p-4 text-sm font-mono text-gray-700 focus:outline-none resize-none"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 pt-2">
                <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-midnight hover:bg-gray-50 transition-colors cursor-pointer">
                  Save Draft
                </button>
                <button className="px-6 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
                  Publish
                </button>
              </div>
            </div>

            {/* Right Sidebar — 30% */}
            <div className="space-y-5" style={{ flex: '3' }}>
              {/* Status */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>

              {/* Category */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Tags */}
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
                <input
                  type="text"
                  placeholder="Type tag + Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20"
                />
              </div>

              {/* Author */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Author</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
                  {authors.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              {/* Publish Date */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20"
                />
              </div>

              {/* SEO */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <button onClick={() => setSeoOpen(!seoOpen)} className="flex items-center justify-between w-full text-sm font-medium text-midnight cursor-pointer">
                  SEO Settings
                  <svg className={`w-4 h-4 transition-transform ${seoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {seoOpen && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={title[locale] || 'Post title'}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Meta Description</label>
                      <textarea
                        value={metaDesc}
                        onChange={(e) => setMetaDesc(e.target.value)}
                        rows={3}
                        placeholder="Brief description for search engines..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 resize-none"
                      />
                    </div>
                    {/* Google Search Preview */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <p className="text-xs text-gray-400 mb-2 font-medium">Search Preview</p>
                      <p className="text-sm text-blue-700 font-medium truncate">{metaTitle || title[locale] || 'Page Title'}</p>
                      <p className="text-xs text-green-700 truncate">maxup.co.il/blog/post-slug</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{metaDesc || 'Meta description will appear here...'}</p>
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
