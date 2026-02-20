import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ToastProvider } from '@/components/admin/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MaxUp CMS',
  description: 'Content Management Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="font-inter antialiased bg-gray-100 text-midnight">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
