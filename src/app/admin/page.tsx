'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

const stats = [
  { label: 'Total Views', value: '12,847', trend: '+12%', up: true },
  { label: 'Blog Posts', value: '24', trend: '+3', up: true },
  { label: 'Portfolio Items', value: '18', trend: '+2', up: true },
  { label: 'Contact Forms', value: '7', trend: '-2', up: false },
];

const activities = [
  { text: 'New contact form submission from Ahmed K.', time: '2 hours ago' },
  { text: 'Blog post "أفضل استراتيجيات التسويق" published', time: '5 hours ago' },
  { text: 'Portfolio project "E-commerce Platform" updated', time: '1 day ago' },
  { text: 'New testimonial from Fatima S. approved', time: '2 days ago' },
  { text: 'Team member profile for Yara M. added', time: '3 days ago' },
];

const quickActions = [
  { label: 'New Blog Post', href: '/admin/posts/new' },
  { label: 'Add Project', href: '/admin/portfolio' },
  { label: 'Edit Services', href: '/admin/services' },
  { label: 'View Analytics', href: '/admin' },
];

export default function AdminDashboard() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Dashboard" />
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-midnight">{greeting}, Muhanad</h2>
            <p className="text-gray-400 mt-1">{dateStr}</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-midnight">{s.value}</span>
                  <span className={`text-sm font-medium ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                    {s.up ? '↑' : '↓'} {s.trend}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-midnight mb-4">Recent Activity</h3>
              <ul className="space-y-4">
                {activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-ruby rounded-full mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-midnight mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((a) => (
                  <a key={a.label} href={a.href} className="block w-full text-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-midnight hover:bg-gray-100 transition-colors">
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
