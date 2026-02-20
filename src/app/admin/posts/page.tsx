'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import Link from 'next/link';
import { useState } from 'react';
import { orderBy } from 'firebase/firestore';
import { TableSkeleton } from '@/components/admin/LoadingSkeleton';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection';
import * as blogService from '@/lib/services/blog';
import type { BlogPost } from '@/lib/types';

const fallbackPosts: Partial<BlogPost>[] = [
  { id: '1', title: { ar: 'أفضل استراتيجيات التسويق الرقمي لعام 2026', en: '', he: '' }, status: 'published', author: { name: 'Ahmad Khalil', avatar: '' } },
  { id: '2', title: { ar: 'كيف تبني هوية بصرية قوية لعلامتك التجارية', en: '', he: '' }, status: 'published', author: { name: 'MaxUp Team', avatar: '' } },
  { id: '3', title: { ar: 'دليلك الشامل لتحسين محركات البحث SEO', en: '', he: '' }, status: 'draft', author: { name: 'Sarah Cohen', avatar: '' } },
  { id: '4', title: { ar: 'أهمية تجربة المستخدم في تصميم المواقع', en: '', he: '' }, status: 'published', author: { name: 'Yael Levy', avatar: '' } },
  { id: '5', title: { ar: 'اتجاهات تطوير تطبيقات الموبايل في 2026', en: '', he: '' }, status: 'draft', author: { name: 'Ahmad Khalil', avatar: '' } },
  { id: '6', title: { ar: 'كيفية إدارة حملات إعلانية ناجحة على وسائل التواصل', en: '', he: '' }, status: 'published', author: { name: 'MaxUp Team', avatar: '' } },
];

export default function PostsPage() {
  const { showToast } = useToast();
  const { data: posts, loading, error } = useFirestoreCollection<BlogPost>(
    'blog',
    [orderBy('publishDate', 'desc')],
    fallbackPosts as BlogPost[]
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState('Bulk Actions');
  const perPage = 5;

  const filtered = posts.filter((p) => {
    const status = p.status === 'published' ? 'Published' : 'Draft';
    if (filter !== 'All' && status !== filter) return false;
    const title = p.title?.ar || p.title?.en || '';
    if (search && !title.includes(search) && !title.toLowerCase().includes(search.toLowerCase())) return false;
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

  const toggleOne = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelected(newSet);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await blogService.remove(deleteId);
      showToast('success', 'Post deleted');
    } catch {
      showToast('error', 'Failed to delete post');
    }
    setDeleteId(null);
  };

  const handleBulkApply = async () => {
    if (selected.size === 0 || bulkAction === 'Bulk Actions') return;
    try {
      const ids = Array.from(selected);
      if (bulkAction === 'Delete Selected') {
        for (const id of ids) await blogService.remove(id);
        showToast('success', `${ids.length} posts deleted`);
      } else if (bulkAction === 'Mark as Draft') {
        for (const id of ids) await blogService.update(id, { status: 'draft' });
        showToast('success', `${ids.length} posts set to draft`);
      } else if (bulkAction === 'Mark as Published') {
        for (const id of ids) await blogService.update(id, { status: 'published' });
        showToast('success', `${ids.length} posts published`);
      }
      setSelected(new Set());
      setBulkAction('Bulk Actions');
    } catch {
      showToast('error', 'Bulk action failed');
    }
  };

  const getPostTitle = (p: BlogPost) => p.title?.ar || p.title?.en || 'Untitled';
  const getPostStatus = (p: BlogPost) => p.status === 'published' ? 'Published' : 'Draft';
  const getPostAuthor = (p: BlogPost) => p.author?.name || 'Unknown';
  const getPostDate = (p: BlogPost) => p.publishDate?.toDate?.()?.toISOString?.()?.split('T')[0] || '';

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Blog Posts" />
        <main className="p-6">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              Failed to load posts. Showing sample data.
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-midnight">Blog Posts</h2>
            <Link href="/admin/posts/new" className="px-5 py-2.5 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
              + New Post
            </Link>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search posts..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby" />
            </div>
            <select value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ruby/20 cursor-pointer">
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          {selected.size > 0 && (
            <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-ruby/5 border border-ruby/20 rounded-lg">
              <span className="text-sm text-midnight font-medium">{selected.size} selected</span>
              <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white cursor-pointer">
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Mark as Draft</option>
                <option>Mark as Published</option>
              </select>
              <button onClick={handleBulkApply} className="px-3 py-1.5 bg-ruby text-white rounded-lg text-xs font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
                Apply
              </button>
            </div>
          )}

          {loading ? (
            <TableSkeleton rows={5} cols={6} />
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-gray-300 accent-ruby cursor-pointer" /></th>
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
                      <td className="px-4 py-4"><input type="checkbox" checked={selected.has(post.id)} onChange={() => toggleOne(post.id)} className="rounded border-gray-300 accent-ruby cursor-pointer" /></td>
                      <td className="px-4 py-4 text-sm font-medium text-midnight max-w-xs" dir="rtl"><span className="line-clamp-1">{getPostTitle(post)}</span></td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getPostStatus(post) === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {getPostStatus(post)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{getPostAuthor(post)}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{getPostDate(post)}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-3">
                          <Link href={`/admin/posts/${post.id}`} className="text-sm text-ruby hover:underline">Edit</Link>
                          <button onClick={() => setDeleteId(post.id)} className="text-sm text-red-400 hover:underline cursor-pointer">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">No posts found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-400">Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</p>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPage === page ? 'bg-ruby text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
