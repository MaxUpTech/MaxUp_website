'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';

type Lang = 'ar' | 'en' | 'he';

export default function ServiceEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<string>('en');
  const [seoOpen, setSeoOpen] = useState(false);

  const [form, setForm] = useState({
    icon: '',
    isActive: true,
    title: { ar: '', en: '', he: '' },
    shortDescription: { ar: '', en: '', he: '' },
    fullDescription: { ar: '', en: '', he: '' },
    bullets: { ar: [''], en: [''], he: [''] } as Record<Lang, string[]>,
    seo: {
      metaTitle: { ar: '', en: '', he: '' },
      metaDescription: { ar: '', en: '', he: '' },
    },
  });

  const lang = activeLocale as Lang;

  const updateLocalized = (field: 'title' | 'shortDescription' | 'fullDescription', value: string) => {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
  };

  const updateBullet = (index: number, value: string) => {
    setForm((f) => {
      const bullets = { ...f.bullets, [lang]: [...f.bullets[lang]] };
      bullets[lang][index] = value;
      return { ...f, bullets };
    });
  };

  const addBullet = () => {
    setForm((f) => ({
      ...f,
      bullets: { ...f.bullets, [lang]: [...f.bullets[lang], ''] },
    }));
  };

  const removeBullet = (index: number) => {
    setForm((f) => ({
      ...f,
      bullets: { ...f.bullets, [lang]: f.bullets[lang].filter((_, i) => i !== index) },
    }));
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Edit Service" />
        <main className="p-6 max-w-4xl">
          {/* Language Tabs */}
          <div className="mb-6">
            <LocalizedTabs activeLocale={activeLocale} onLocaleChange={setActiveLocale} />
          </div>

          {/* Localized Fields */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Content ({activeLocale.toUpperCase()})
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={form.title[lang]}
                onChange={(e) => updateLocalized('title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                value={form.shortDescription[lang]}
                onChange={(e) => updateLocalized('shortDescription', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={5}
                value={form.fullDescription[lang]}
                onChange={(e) => updateLocalized('fullDescription', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Points</label>
              {form.bullets[lang].map((bullet, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => updateBullet(i, e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                    placeholder={`Bullet ${i + 1}`}
                  />
                  <button
                    onClick={() => removeBullet(i)}
                    className="text-red-400 hover:text-red-600 text-sm px-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={addBullet}
                className="text-sm text-ruby font-medium hover:underline cursor-pointer"
              >
                + Add Bullet
              </button>
            </div>
          </div>

          {/* Language-Independent Fields */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">General</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon (class or emoji)</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                placeholder="e.g. 🎨 or icon-name"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <button
                onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  form.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.isActive ? 'translate-x-5' : ''
                  }`}
                />
              </button>
              <span className="text-sm text-gray-500">{form.isActive ? 'Active' : 'Inactive'}</span>
            </div>

            {/* Image Upload Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 hover:border-ruby/40 transition-colors cursor-pointer">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Click or drag to upload</p>
              </div>
            </div>
          </div>

          {/* SEO Section (collapsible) */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between p-6 cursor-pointer"
            >
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">SEO Settings</h2>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${seoOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {seoOpen && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title ({activeLocale.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={form.seo.metaTitle[lang]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        seo: { ...f.seo, metaTitle: { ...f.seo.metaTitle, [lang]: e.target.value } },
                      }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description ({activeLocale.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={form.seo.metaDescription[lang]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        seo: { ...f.seo, metaDescription: { ...f.seo.metaDescription, [lang]: e.target.value } },
                      }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="bg-ruby text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
              Save Changes
            </button>
            <button
              onClick={() => router.push('/admin/services')}
              className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
