'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import Link from 'next/link';
import { useState } from 'react';

const posts = [
  { id: 1, title: 'أفضل استراتيجيات التسويق الرقمي لعام 2026', status: 'Published', author: 'MaxUp Team', date: '2026-02-18' },
  { id: 2, title: 'كيف تبني هوية بصرية قوية لعلامتك التجارية', status: 'Published', author: 'MaxUp Team', date: '2026-02-15' },
  { id: 3, title: 'دليلك الشامل لتحسين محركات البحث SEO', status: 'Draft', author: 'MaxUp Team', date: '2026-02-12' },
  { id: 4, title: 'أهمية تجربة المستخدم في تصميم المواقع', status: 'Published', author: 'MaxUp Team', date: '2026-02-08' },
  { id: 5, title: 'اتجاهات تطوير تطبيقات الموبايل في 2026', status: 'Draft', author: 'MaxUp Team', date: '2026-02-05' },
];

export default function PostsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = posts.filter((p) => {
    if (filter !== 'All' && p.status !== filter) return false;
    if (search && !p.title.includes(search)) return false;
    return true;
  });

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Blog Posts" />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-midnight">Blog Posts</h2>
            <Link href="/admin/posts/new" className="px-5 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
              New Post
            </Link>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby"
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Title</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Author</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-midnight" dir="rtl">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-sm text-ruby hover:underline">Edit</button>
                        <button className="text-sm text-red-400 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
