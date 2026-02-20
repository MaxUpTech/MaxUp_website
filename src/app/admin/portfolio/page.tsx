'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

const projects = [
  { id: 1, name: 'E-commerce Platform', category: 'Development' },
  { id: 2, name: 'Restaurant Brand Identity', category: 'Design' },
  { id: 3, name: 'SaaS Marketing Campaign', category: 'Marketing' },
  { id: 4, name: 'Healthcare App', category: 'Development' },
  { id: 5, name: 'Real Estate Website', category: 'Design' },
  { id: 6, name: 'FinTech Dashboard', category: 'Development' },
];

const categoryColors: Record<string, string> = {
  Development: 'bg-blue-100 text-blue-700',
  Design: 'bg-purple-100 text-purple-700',
  Marketing: 'bg-green-100 text-green-700',
};

export default function PortfolioPage() {
  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Portfolio" />
        <main className="p-6">
          <h2 className="text-2xl font-bold text-midnight mb-6">Portfolio</h2>

          <div className="grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-midnight mb-2">{project.name}</h3>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[project.category] || ''}`}>
                    {project.category}
                  </span>
                  <div className="flex gap-2 mt-3">
                    <button className="text-sm text-ruby hover:underline">Edit</button>
                    <button className="text-sm text-red-400 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Project Card */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[240px] cursor-pointer hover:border-ruby/40 transition-colors">
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <p className="text-sm font-medium text-gray-400">+ Add Project</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
