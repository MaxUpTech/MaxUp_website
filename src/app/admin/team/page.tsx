'use client';

import { useState } from 'react';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';
import type { TeamMember, LocalizedString } from '@/lib/types';

const initialMembers: TeamMember[] = [
  { id: '1', name: { ar: 'أحمد خالد', en: 'Ahmad Khaled', he: 'אחמד חאלד' }, role: { ar: 'المدير التنفيذي', en: 'CEO & Founder', he: 'מנכ"ל ומייסד' }, bio: { ar: 'قائد رؤيوي مع خبرة 15 عاماً', en: 'Visionary leader with 15+ years in digital transformation.', he: 'מנהיג בעל חזון עם 15+ שנות ניסיון' }, photo: '', socialLinks: { linkedin: 'https://linkedin.com/in/ahmad', twitter: 'https://twitter.com/ahmad' }, order: 1 },
  { id: '2', name: { ar: 'سارة محمد', en: 'Sara Mohammed', he: 'סארה מוחמד' }, role: { ar: 'مديرة التصميم', en: 'Design Director', he: 'מנהלת עיצוב' }, bio: { ar: 'مصممة إبداعية بخبرة واسعة', en: 'Creative designer specializing in UX/UI and brand identity.', he: 'מעצבת יצירתית המתמחה ב-UX/UI' }, photo: '', socialLinks: { linkedin: 'https://linkedin.com/in/sara' }, order: 2 },
  { id: '3', name: { ar: 'يوسف علي', en: 'Yousef Ali', he: 'יוסף עלי' }, role: { ar: 'مدير التقنية', en: 'CTO', he: 'מנהל טכנולוגיה' }, bio: { ar: 'خبير تقني في تطوير البرمجيات', en: 'Tech expert leading full-stack development and cloud architecture.', he: 'מומחה טכנולוגי בפיתוח תוכנה' }, photo: '', socialLinks: { linkedin: 'https://linkedin.com/in/yousef', twitter: 'https://twitter.com/yousef' }, order: 3 },
  { id: '4', name: { ar: 'نور حسين', en: 'Noor Hussein', he: 'נור חוסיין' }, role: { ar: 'مديرة التسويق', en: 'Marketing Manager', he: 'מנהלת שיווק' }, bio: { ar: 'متخصصة في التسويق الرقمي', en: 'Digital marketing specialist driving growth and engagement.', he: 'מומחית שיווק דיגיטלי' }, photo: '', socialLinks: { linkedin: 'https://linkedin.com/in/noor' }, order: 4 },
];

const emptyLocalized: LocalizedString = { ar: '', en: '', he: '' };

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [locale, setLocale] = useState('en');
  const [form, setForm] = useState<TeamMember>({
    id: '', name: { ...emptyLocalized }, role: { ...emptyLocalized }, bio: { ...emptyLocalized }, photo: '', socialLinks: {}, order: 0,
  });

  const startAdd = () => {
    setIsAdding(true); setEditingId(null);
    setForm({ id: '', name: { ...emptyLocalized }, role: { ...emptyLocalized }, bio: { ...emptyLocalized }, photo: '', socialLinks: {}, order: members.length + 1 });
    setLocale('en');
  };

  const startEdit = (m: TeamMember) => {
    setEditingId(m.id); setIsAdding(false);
    setForm({ ...m, name: { ...m.name }, role: { ...m.role }, bio: { ...m.bio }, socialLinks: { ...m.socialLinks } });
    setLocale('en');
  };

  const cancel = () => { setEditingId(null); setIsAdding(false); };

  const save = () => {
    if (isAdding) {
      setMembers([...members, { ...form, id: Date.now().toString() }]);
    } else {
      setMembers(members.map(m => m.id === editingId ? { ...form } : m));
    }
    cancel();
  };

  const remove = (id: string) => setMembers(members.filter(m => m.id !== id));

  const showForm = isAdding || editingId;
  const loc = locale as keyof LocalizedString;

  return (
    <div className="ms-64 min-h-screen bg-[#F3F2EF]">
      <TopBar title="Team Members" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">{members.length} team members</p>
          {!showForm && (
            <button onClick={startAdd} className="bg-ruby hover:bg-ruby/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              + Add Member
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-midnight mb-4">{isAdding ? 'Add Member' : 'Edit Member'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs hover:border-ruby/50 transition-colors cursor-pointer overflow-hidden">
                  <input type="file" accept="image/*" className="hidden" id="member-photo" />
                  <label htmlFor="member-photo" className="cursor-pointer text-center p-2">Upload<br />Photo</label>
                </div>
              </div>
              <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name ({locale.toUpperCase()})</label>
                  <input value={form.name[loc]} onChange={e => setForm({ ...form, name: { ...form.name, [locale]: e.target.value } })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role ({locale.toUpperCase()})</label>
                  <input value={form.role[loc]} onChange={e => setForm({ ...form, role: { ...form.role, [locale]: e.target.value } })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio ({locale.toUpperCase()})</label>
                <textarea value={form.bio[loc]} onChange={e => setForm({ ...form, bio: { ...form.bio, [locale]: e.target.value } })} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input value={form.socialLinks.linkedin || ''} onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                  <input value={form.socialLinks.twitter || ''} onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby" placeholder="https://twitter.com/..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="bg-ruby hover:bg-ruby/90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Save</button>
                <button onClick={cancel} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map(m => (
            <div key={m.id} className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-[120px] h-[120px] rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-gray-400 text-2xl font-bold">
                {m.name.en.charAt(0)}
              </div>
              <p className="font-medium text-midnight text-sm">{m.name.en}</p>
              <p className="text-gray-400 text-xs mb-4">{m.role.en}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => startEdit(m)} className="text-sm text-ruby hover:underline cursor-pointer">Edit</button>
                <button onClick={() => remove(m.id)} className="text-sm text-red-500 hover:underline cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
