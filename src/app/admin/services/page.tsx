'use client';

import Link from 'next/link';
import { useState } from 'react';
import { orderBy } from 'firebase/firestore';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import { CardSkeleton } from '@/components/admin/LoadingSkeleton';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection';
import * as servicesService from '@/lib/services/services';
import type { Service } from '@/lib/types';

const fallbackServices: Service[] = [
  { id: '1', icon: '🎨', title: { ar: '', en: 'Branding & Identity', he: '' }, isActive: true },
  { id: '2', icon: '💻', title: { ar: '', en: 'Web Development', he: '' }, isActive: true },
  { id: '3', icon: '📱', title: { ar: '', en: 'Mobile Apps', he: '' }, isActive: true },
  { id: '4', icon: '📈', title: { ar: '', en: 'Digital Marketing', he: '' }, isActive: false },
  { id: '5', icon: '🎯', title: { ar: '', en: 'SEO Optimization', he: '' }, isActive: true },
  { id: '6', icon: '☁️', title: { ar: '', en: 'Cloud Solutions', he: '' }, isActive: false },
] as any[];

export default function ServicesPage() {
  const { showToast } = useToast();
  const { data: services, loading, error } = useFirestoreCollection<Service>(
    'services',
    [orderBy('order', 'asc')],
    fallbackServices as Service[]
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await servicesService.remove(deleteId);
      showToast('success', 'Service deleted');
    } catch {
      showToast('error', 'Failed to delete service');
    }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Services" />
        <main className="p-6">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              Failed to load services. Showing sample data.
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">{services.length} services</p>
            <Link href="/admin/services/new" className="bg-ruby text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
              + Add Service
            </Link>
          </div>

          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-midnight mb-2">{service.title?.en || 'Untitled'}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/admin/services/${service.id}`} className="text-sm text-ruby font-medium hover:underline">
                      Edit →
                    </Link>
                    <button onClick={() => setDeleteId(service.id)} className="text-sm text-red-400 hover:underline cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
