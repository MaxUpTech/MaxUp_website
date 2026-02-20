'use client';

import Link from 'next/link';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

const mockServices = [
  { id: '1', icon: '🎨', title: 'Branding & Identity', isActive: true },
  { id: '2', icon: '💻', title: 'Web Development', isActive: true },
  { id: '3', icon: '📱', title: 'Mobile Apps', isActive: true },
  { id: '4', icon: '📈', title: 'Digital Marketing', isActive: false },
  { id: '5', icon: '🎯', title: 'SEO Optimization', isActive: true },
  { id: '6', icon: '☁️', title: 'Cloud Solutions', isActive: false },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Services" />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">{mockServices.length} services</p>
            <button className="bg-ruby text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors">
              + Add Service
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {mockServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-midnight mb-2">{service.title}</h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    service.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="mt-4">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="text-sm text-ruby font-medium hover:underline"
                  >
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
