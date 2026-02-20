'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';

const navKeys = ['services', 'portfolio', 'about', 'blog', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-ruby rounded-lg flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="font-bold text-xl text-midnight">MAXUP</span>
          <span className="text-gray-400 text-sm">مكسب</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={key === 'services' ? '/#services' : key === 'contact' ? '/contact' : `/${key}`}
              className="relative text-gray-600 hover:text-midnight transition-colors text-sm font-medium group"
            >
              {t(key)}
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-ruby transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm">
            {locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={`px-2 py-1 rounded transition-colors ${
                  l === locale ? 'text-ruby font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          {/* CTA */}
          <Link
            href="/contact"
            className="bg-ruby text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-ruby/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 pb-6 pt-4 space-y-4">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={key === 'services' ? '/#services' : key === 'contact' ? '/contact' : `/${key}`}
              className="block text-gray-600 hover:text-midnight text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
            {locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={`px-2 py-1 rounded text-sm ${
                  l === locale ? 'text-ruby font-bold' : 'text-gray-400'
                }`}
                onClick={() => setOpen(false)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="block text-center bg-ruby text-white px-5 py-2.5 rounded-xl text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  );
}
