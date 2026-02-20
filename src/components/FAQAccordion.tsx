'use client';

import { useState } from 'react';

interface FAQItem { question: string; answer: string; }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center py-5 text-start"
          >
            <span className="text-lg font-bold text-midnight">{item.question}</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {openIndex === i && (
            <div className="pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
