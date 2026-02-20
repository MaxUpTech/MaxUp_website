'use client';

import Link from 'next/link';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

const mockPages = [
  { slug: 'home', name: 'Home', lastEdited: '2026-02-18', status: 'Published' },
  { slug: 'about', name: 'About', lastEdited: '2026-02-15', status: 'Published' },
  { slug: 'services', name: 'Services', lastEdited: '2026-02-20', status: 'Published' },
  { slug: 'contact', name: 'Contact', lastEdited: '2026-02-10', status: 'Draft' },
  { slug: 'pricing', name: 'Pricing', lastEdited: '2026-02-12', status: 'Published' },
];

export default function PagesManagerPage() {
  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Pages" />
        <main className="p-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Page Name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Last Edited</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPages.map((page) => (
                  <tr key={page.slug} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-midnight">{page.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{page.lastEdited}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          page.status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="text-sm text-ruby font-medium hover:underline"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
