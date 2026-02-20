'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import Link from 'next/link';
import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  status: 'Published' | 'Draft';
  author: string;
  date: string;
}

const initialPosts: Post[] = [
  { id: 1, title: 'أفضل استراتيجيات التسويق الرقمي لعام 2026', status: 'Published', author: 'Ahmad Khalil', date: '2026-02-18' },
  { id: 2, title: 'كيف تبني هوية بصرية قوية لعلامتك التجارية', status: 'Published', author: 'MaxUp Team', date: '2026-02-15' },
  { id: 3, title: 'دليلك الشامل لتحسين محركات البحث SEO', status: 'Draft', author: 'Sarah Cohen', date: '2026-02-12' },
  { id: 4, title: 'أهمية تجربة المستخدم في تصميم المواقع', status: 'Published', author: 'Yael Levy', date: '2026-02-08' },
  { id: 5, title: 'اتجاهات تطوير تطبيقات الموبايل في 2026', status: 'Draft', author: 'Ahmad Khalil', date: '2026-02-05' },
  { id: 6, title: 'كيفية إدارة حملات إعلانية ناجحة على وسائل التواصل', status: 'Published', author: 'MaxUp Team', date: '2026-02-01' },
];

export default function PostsPage() {
  const [posts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = posts.filter((p) => {
    if (filter !== 'All' && p.status !== filter) return false;
    if (search && !p.title.includes(search)) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const allSelected = paginated.length > 0 && paginated.every((p) => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) {
      const newSet = new Set(selected);
      paginated.forEach((p) => newSet.delete(p.id));
      setSelected(newSet);
    } else {
      const newSet = new Set(selected);
      paginated.forEach((p) => newSet.add(p.id));
      setSelected(newSet);
    }
  };

  const toggleOne = (id: number) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelected(newSet);
  };

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Blog Posts" />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-midnight">Blog Posts</h2>
            <Link href="/admin/posts/new" className="px-5 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
              + New Post
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer"
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selected.size > 0 && (
            <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-ruby/5 border border-ruby/20 rounded-lg">
              <span className="text-sm text-midnight font-medium">{selected.size} selected</span>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white cursor-pointer">
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Mark as Draft</option>
                <option>Mark as Published</option>
              </select>
              <button className="px-3 py-1.5 bg-ruby text-white rounded-lg text-xs font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
                Apply
              </button>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-gray-300 accent-ruby cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Title</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Author</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" checked={selected.has(post.id)} onChange={() => toggleOne(post.id)} className="rounded border-gray-300 accent-ruby cursor-pointer" />
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-midnight max-w-xs" dir="rtl">
                      <span className="line-clamp-1">{post.title}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{post.author}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{post.date}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        <button className="text-sm text-ruby hover:underline cursor-pointer">Edit</button>
                        <button className="text-sm text-red-400 hover:underline cursor-pointer">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">No posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-400">
                Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === page ? 'bg-ruby text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
