'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const serviceLinks = ['webDev', 'marketing', 'content', 'branding', 'social', 'seo'] as const;
const companyLinks = ['about', 'portfolio', 'blog', 'contact'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const services = useTranslations('services');

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo + description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-ruby rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="font-bold text-xl text-midnight">MAXUP</span>
              <span className="text-gray-400 text-sm">مكسب</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">{t('description')}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-midnight mb-4">{t('servicesTitle')}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((key) => (
                <li key={key}>
                  <Link href="/#services" className="text-gray-600 text-sm hover:text-ruby transition-colors">
                    {services(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-midnight mb-4">{t('companyTitle')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={key === 'contact' ? '/contact' : `/${key}`}
                    className="text-gray-600 text-sm hover:text-ruby transition-colors"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-midnight mb-4">{t('contactTitle')}</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>info@maxup.agency</li>
              <li>+972-50-000-0000</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} MAXUP. {t('rights')}</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ruby transition-colors">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-ruby transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
