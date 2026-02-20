'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, hoverClass: 'hover:bg-black hover:text-white', icon: '𝕏' },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, hoverClass: 'hover:bg-[#0A66C2] hover:text-white', icon: 'in' },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, hoverClass: 'hover:bg-[#1877F2] hover:text-white', icon: 'f' },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodedTitle}%20${encoded}`, hoverClass: 'hover:bg-[#25D366] hover:text-white', icon: 'wa' },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold transition-colors ${p.hoverClass}`}
          aria-label={`Share on ${p.name}`}
        >
          {p.icon}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="h-10 px-4 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-midnight hover:text-white transition-colors cursor-pointer"
      >
        {copied ? '✓ Copied!' : '🔗 Copy'}
      </button>
    </div>
  );
}
