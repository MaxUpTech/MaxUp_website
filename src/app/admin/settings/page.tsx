'use client';

import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';
import { useState } from 'react';

function CollapsibleCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <h3 className="text-base font-semibold text-midnight">{title}</h3>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <div className="px-6 pb-6 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

function SaveButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex justify-end mt-4">
      <button onClick={onClick} className="px-5 py-2 bg-ruby text-white rounded-lg text-sm font-medium hover:bg-ruby/90 transition-colors cursor-pointer">
        Save Changes
      </button>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder, dir }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; dir?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby"
      />
    </div>
  );
}

function UploadZone({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="border-2 border-dashed border-gray-200 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-ruby/40 transition-colors bg-gray-50">
        <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <p className="text-xs text-gray-400">Click or drag to upload</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [locale, setLocale] = useState('ar');

  // General
  const [siteName, setSiteName] = useState<Record<string, string>>({ ar: 'ماكس أب', en: 'MaxUp', he: 'מקס אפ' });
  const [siteDesc, setSiteDesc] = useState<Record<string, string>>({ ar: 'وكالة تسويق رقمي متكاملة', en: 'Full-service digital marketing agency', he: 'סוכנות שיווק דיגיטלי מלאה' });

  // Contact
  const [email, setEmail] = useState('info@maxup.co.il');
  const [phone, setPhone] = useState('+972-50-000-0000');
  const [address, setAddress] = useState<Record<string, string>>({ ar: 'حيفا، إسرائيل', en: 'Haifa, Israel', he: 'חיפה, ישראל' });

  // Social
  const [instagram, setInstagram] = useState('https://instagram.com/maxup');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/company/maxup');
  const [twitter, setTwitter] = useState('https://x.com/maxup');
  const [facebook, setFacebook] = useState('https://facebook.com/maxup');

  // SEO
  const [metaTitleTemplate, setMetaTitleTemplate] = useState('%s | MaxUp');
  const [metaDesc, setMetaDesc] = useState<Record<string, string>>({ ar: 'ماكس أب - وكالة تسويق رقمي', en: 'MaxUp - Digital Marketing Agency', he: 'מקס אפ - סוכנות שיווק דיגיטלי' });

  // Analytics
  const [gaId, setGaId] = useState('G-XXXXXXXXXX');

  // Maintenance
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState('We are currently performing scheduled maintenance. Please check back soon.');

  const dir = locale === 'en' ? 'ltr' : 'rtl';

  return (
    <>
      <Sidebar />
      <div className="ms-64">
        <TopBar title="Settings" />
        <main className="p-6 space-y-6 max-w-4xl">

          {/* General */}
          <CollapsibleCard title="General" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
            <div className="space-y-4">
              <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
              <InputField label="Site Name" value={siteName[locale] || ''} onChange={(v) => setSiteName({ ...siteName, [locale]: v })} dir={dir} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                <textarea
                  value={siteDesc[locale] || ''}
                  onChange={(e) => setSiteDesc({ ...siteDesc, [locale]: e.target.value })}
                  rows={3}
                  dir={dir}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby resize-none"
                />
              </div>
              <UploadZone label="Logo" />
              <SaveButton />
            </div>
          </CollapsibleCard>

          {/* Contact */}
          <CollapsibleCard title="Contact Information" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
            <div className="space-y-4">
              <InputField label="Email" value={email} onChange={setEmail} type="email" />
              <InputField label="Phone" value={phone} onChange={setPhone} type="tel" />
              <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
              <InputField label="Address" value={address[locale] || ''} onChange={(v) => setAddress({ ...address, [locale]: v })} dir={dir} />
              <SaveButton />
            </div>
          </CollapsibleCard>

          {/* Social Links */}
          <CollapsibleCard title="Social Links" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}>
            <div className="space-y-4">
              <InputField label="Instagram" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
              <InputField label="LinkedIn" value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/company/..." />
              <InputField label="Twitter / X" value={twitter} onChange={setTwitter} placeholder="https://x.com/..." />
              <InputField label="Facebook" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
              <SaveButton />
            </div>
          </CollapsibleCard>

          {/* SEO Defaults */}
          <CollapsibleCard title="SEO Defaults" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}>
            <div className="space-y-4">
              <InputField label="Meta Title Template" value={metaTitleTemplate} onChange={setMetaTitleTemplate} placeholder="%s | Brand" />
              <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Description</label>
                <textarea
                  value={metaDesc[locale] || ''}
                  onChange={(e) => setMetaDesc({ ...metaDesc, [locale]: e.target.value })}
                  rows={3}
                  dir={dir}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby resize-none"
                />
              </div>
              <UploadZone label="Default OG Image" />
              <SaveButton />
            </div>
          </CollapsibleCard>

          {/* Analytics */}
          <CollapsibleCard title="Analytics" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
            <div className="space-y-4">
              <InputField label="Google Analytics Measurement ID" value={gaId} onChange={setGaId} placeholder="G-XXXXXXXXXX" />
              <SaveButton />
            </div>
          </CollapsibleCard>

          {/* Maintenance Mode */}
          <CollapsibleCard title="Maintenance Mode" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Enable Maintenance Mode</p>
                  <p className="text-xs text-gray-400">Site will show a maintenance page to visitors</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${maintenanceMode ? 'bg-ruby' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Message</label>
                <textarea
                  value={maintenanceMsg}
                  onChange={(e) => setMaintenanceMsg(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ruby/20 focus:border-ruby resize-none"
                />
              </div>
              <SaveButton />
            </div>
          </CollapsibleCard>

        </main>
      </div>
    </>
  );
}
