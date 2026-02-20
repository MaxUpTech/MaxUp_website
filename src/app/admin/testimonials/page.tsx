'use client';

import { useState } from 'react';
import TopBar from '@/components/admin/TopBar';
import LocalizedTabs from '@/components/LocalizedTabs';
import type { Testimonial, LocalizedString } from '@/lib/types';

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: { ar: 'خدمة ممتازة ونتائج رائعة', en: 'Excellent service and outstanding results. The team went above and beyond to deliver a website that truly represents our brand.', he: 'שירות מצוין ותוצאות מעולות' },
    clientName: 'Sarah Johnson',
    company: 'TechStart Inc.',
    rating: 5,
    clientPhoto: '',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    quote: { ar: 'فريق محترف جداً وملتزم بالمواعيد', en: 'Very professional team that delivers on time. Our digital presence has improved dramatically since working with MaxUp.', he: 'צוות מקצועי מאוד שעומד בלוחות זמנים' },
    clientName: 'Ahmed Al-Rashid',
    company: 'Gulf Ventures',
    rating: 4,
    clientPhoto: '',
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    quote: { ar: 'تجربة رائعة من البداية للنهاية', en: 'A wonderful experience from start to finish. They understood our vision perfectly and executed it flawlessly.', he: 'חוויה נהדרת מתחילה ועד סוף' },
    clientName: 'David Cohen',
    company: 'Innovate Labs',
    rating: 5,
    clientPhoto: '',
    isActive: true,
    order: 3,
  },
];

const emptyLocalized: LocalizedString = { ar: '', en: '', he: '' };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [locale, setLocale] = useState('en');
  const [form, setForm] = useState<Testimonial>({
    id: '', quote: { ...emptyLocalized }, clientName: '', company: '', rating: 5, clientPhoto: '', isActive: true, order: 0,
  });

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({ id: '', quote: { ...emptyLocalized }, clientName: '', company: '', rating: 5, clientPhoto: '', isActive: true, order: testimonials.length + 1 });
    setLocale('en');
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setIsAdding(false);
    setForm({ ...t, quote: { ...t.quote } });
    setLocale('en');
  };

  const cancel = () => { setEditingId(null); setIsAdding(false); };

  const save = () => {
    if (isAdding) {
      setTestimonials([...testimonials, { ...form, id: Date.now().toString() }]);
    } else {
      setTestimonials(testimonials.map(t => t.id === editingId ? { ...form } : t));
    }
    cancel();
  };

  const remove = (id: string) => setTestimonials(testimonials.filter(t => t.id !== id));

  const renderStars = (rating: number, interactive = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && setForm({ ...form, rating: i })}
          className={`text-xl ${interactive ? 'cursor-pointer' : 'cursor-default'} ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >★</button>
      ))}
    </div>
  );

  const showForm = isAdding || editingId;

  return (
    <div className="ms-64 min-h-screen bg-[#F3F2EF]">
      <TopBar title="Testimonials" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">{testimonials.length} testimonials</p>
          {!showForm && (
            <button onClick={startAdd} className="bg-ruby hover:bg-ruby/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              + Add Testimonial
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-midnight mb-4">{isAdding ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                <LocalizedTabs activeLocale={locale} onLocaleChange={setLocale} />
                <textarea
                  value={form.quote[locale as keyof LocalizedString]}
                  onChange={e => setForm({ ...form, quote: { ...form.quote, [locale]: e.target.value } })}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                  rows={3}
                  placeholder={`Quote in ${locale.toUpperCase()}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    value={form.clientName}
                    onChange={e => setForm({ ...form, clientName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ruby/30 focus:border-ruby"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                {renderStars(form.rating, true)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400 text-sm hover:border-ruby/50 transition-colors cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer">Click to upload photo</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="bg-ruby hover:bg-ruby/90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Save</button>
                <button onClick={cancel} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">&ldquo;{t.quote.en}&rdquo;</p>
              <div className="mb-2">{renderStars(t.rating)}</div>
              <p className="font-medium text-midnight text-sm">{t.clientName}</p>
              <p className="text-gray-400 text-xs mb-4">{t.company}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(t)} className="text-sm text-ruby hover:underline cursor-pointer">Edit</button>
                <button onClick={() => remove(t.id)} className="text-sm text-red-500 hover:underline cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
