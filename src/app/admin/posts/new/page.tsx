'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import { useState } from 'react';

const languages = ['AR', 'EN', 'HE'] as const;
const categories = ['Marketing', 'Development', 'Design', 'Business'];

export default function NewPostPage() {
  const [activeLang, setActiveLang] = useState<string>('AR');
  const [tags, setTags] = useState(['SEO', 'tips']);
  const [tagInput, setTagInput] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="New Blog Post" />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-midnight">New Blog Post</h2>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-midnight hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button className="px-5 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
                Publish
              </button>
            </div>
          </div>

          {/* Language Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 w-fit shadow-sm">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLang === lang ? 'bg-midnight text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              <input
                type="text"
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-xl border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby"
                dir={activeLang === 'EN' ? 'ltr' : 'rtl'}
              />

              {/* Featured Image */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 bg-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-ruby/40 transition-colors">
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-sm text-gray-400">Drop image or click to upload</p>
              </div>

              {/* Rich Text Editor */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
                  {['B', 'I', 'H1', 'H2', 'List', 'Link', 'Img', 'Quote'].map((btn) => (
                    <button key={btn} className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors">
                      {btn}
                    </button>
                  ))}
                </div>
                <div
                  className="min-h-[400px] p-4 text-sm text-gray-600 focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  dir={activeLang === 'EN' ? 'ltr' : 'rtl'}
                >
                  Start writing your blog post...
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Status</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>

              {/* Category */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {tag}
                      <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="text-gray-400 hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20"
                />
              </div>

              {/* Author */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Author</label>
                <p className="text-sm text-gray-600">MaxUp Team</p>
              </div>

              {/* Publish Date */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-midnight mb-2">Publish Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20" />
              </div>

              {/* SEO */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <button onClick={() => setSeoOpen(!seoOpen)} className="flex items-center justify-between w-full text-sm font-medium text-midnight">
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Meta Description</label>
                      <textarea
                        value={metaDesc}
                        onChange={(e) => setMetaDesc(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 resize-none"
                      />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium truncate">{metaTitle || title || 'Page Title'}</p>
                      <p className="text-xs text-green-600 truncate">maxup.co.il/blog/post-slug</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{metaDesc || 'Meta description will appear here...'}</p>
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
