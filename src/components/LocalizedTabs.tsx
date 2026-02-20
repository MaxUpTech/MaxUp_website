'use client';

interface LocalizedTabsProps {
  activeLocale: string;
  onLocaleChange: (locale: string) => void;
}

const tabs = [
  { key: 'ar', label: 'AR' },
  { key: 'en', label: 'EN' },
  { key: 'he', label: 'HE' },
];

export default function LocalizedTabs({ activeLocale, onLocaleChange }: LocalizedTabsProps) {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onLocaleChange(tab.key)}
          className={`px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeLocale === tab.key
              ? 'bg-ruby text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
