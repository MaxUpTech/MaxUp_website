'use client';

export default function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
      <h1 className="text-lg font-semibold text-midnight">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-midnight transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-ruby rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-midnight">M</div>
          <span className="text-sm text-gray-600">Admin</span>
        </div>
      </div>
    </header>
  );
}
