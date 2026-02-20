'use client';

import { useState } from 'react';
import { orderBy } from 'firebase/firestore';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import { CardSkeleton } from '@/components/admin/LoadingSkeleton';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection';
import * as portfolioService from '@/lib/services/portfolio';
import type { PortfolioProject } from '@/lib/types';

const fallbackProjects: Partial<PortfolioProject>[] = [
  { id: '1', title: { ar: '', en: 'E-commerce Platform', he: '' }, category: 'Development', heroImage: '' },
  { id: '2', title: { ar: '', en: 'Restaurant Brand Identity', he: '' }, category: 'Design', heroImage: '' },
  { id: '3', title: { ar: '', en: 'SaaS Marketing Campaign', he: '' }, category: 'Marketing', heroImage: '' },
  { id: '4', title: { ar: '', en: 'Healthcare App', he: '' }, category: 'Development', heroImage: '' },
  { id: '5', title: { ar: '', en: 'Real Estate Website', he: '' }, category: 'Design', heroImage: '' },
  { id: '6', title: { ar: '', en: 'FinTech Dashboard', he: '' }, category: 'Development', heroImage: '' },
];

const categoryColors: Record<string, string> = {
  Development: 'bg-blue-100 text-blue-700',
  Design: 'bg-purple-100 text-purple-700',
  Marketing: 'bg-green-100 text-green-700',
};

export default function PortfolioPage() {
  const { showToast } = useToast();
  const { data: projects, loading, error } = useFirestoreCollection<PortfolioProject>(
    'portfolio',
    [orderBy('order', 'asc')],
    fallbackProjects as PortfolioProject[]
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await portfolioService.remove(deleteId);
      showToast('success', 'Project deleted');
    } catch {
      showToast('error', 'Failed to delete project');
    }
    setDeleteId(null);
  };

  const handleAdd = async () => {
    try {
      await portfolioService.create({
        slug: `project-${Date.now()}`,
        title: { ar: 'مشروع جديد', en: 'New Project', he: 'פרויקט חדש' },
        category: 'Development',
        client: '',
        industry: '',
        servicesProvided: [],
        timeline: '',
        heroImage: '',
        galleryImages: [],
        challenge: { ar: '', en: '', he: '' },
        solution: { ar: '', en: '', he: '' },
        outcome: { ar: '', en: '', he: '' },
        metrics: [],
        seo: { metaTitle: { ar: '', en: '', he: '' }, metaDescription: { ar: '', en: '', he: '' } },
        isFeatured: false,
        order: projects.length + 1,
      } as any);
      showToast('success', 'Project created');
    } catch {
      showToast('error', 'Failed to create project');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Portfolio" />
        <main className="p-6">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              Failed to load portfolio. Showing sample data.
            </div>
          )}
          <h2 className="text-2xl font-bold text-midnight mb-6">Portfolio</h2>

          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {project.heroImage ? (
                      <img src={project.heroImage} alt={project.title?.en} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-midnight mb-2">{project.title?.en || 'Untitled'}</h3>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[project.category] || 'bg-gray-100 text-gray-600'}`}>
                      {project.category}
                    </span>
                    <div className="flex gap-2 mt-3">
                      <button className="text-sm text-ruby hover:underline cursor-pointer">Edit</button>
                      <button onClick={() => setDeleteId(project.id)} className="text-sm text-red-400 hover:underline cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              ))}

              <div onClick={handleAdd} className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[240px] cursor-pointer hover:border-ruby/40 transition-colors">
                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <p className="text-sm font-medium text-gray-400">+ Add Project</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
