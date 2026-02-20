'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';

type Lang = 'ar' | 'en' | 'he';

const pageNames: Record<string, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  contact: 'Contact',
  pricing: 'Pricing',
};

export default function PageEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [activeLocale, setActiveLocale] = useState<string>('en');
  const [content, setContent] = useState<Record<Lang, string>>({ ar: '', en: '', he: '' });

  const lang = activeLocale as Lang;
  const pageName = pageNames[slug] || slug;

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Sidebar />
      <div className="ms-64">
        <TopBar title={`Edit Page: ${pageName}`} />
        <main className="p-6 max-w-4xl">
          <div className="mb-6">
            <LocalizedTabs activeLocale={activeLocale} onLocaleChange={setActiveLocale} />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Content ({activeLocale.toUpperCase()})
            </label>
            <textarea
              rows={12}
              value={content[lang]}
              onChange={(e) => setContent((c) => ({ ...c, [lang]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
              placeholder={`Enter ${pageName} page content in ${activeLocale.toUpperCase()}...`}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-ruby text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
              Save Changes
            </button>
            <button
              onClick={() => router.push('/admin/pages')}
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
