'use client';

import { useState, useRef, DragEvent } from 'react';
import TopBar from '@/components/admin/TopBar';
import type { MediaItem } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

const now = Timestamp.now();

const initialMedia: MediaItem[] = [
  { id: '1', filename: 'hero-banner.jpg', url: '/uploads/hero-banner.jpg', type: 'image', size: 245000, dimensions: { width: 1920, height: 1080 }, usedIn: ['Home Page'], uploadedAt: now },
  { id: '2', filename: 'logo-dark.png', url: '/uploads/logo-dark.png', type: 'image', size: 18000, dimensions: { width: 400, height: 120 }, usedIn: ['Header', 'Footer'], uploadedAt: now },
  { id: '3', filename: 'team-photo.jpg', url: '/uploads/team-photo.jpg', type: 'image', size: 520000, dimensions: { width: 2400, height: 1600 }, usedIn: ['About Page'], uploadedAt: now },
  { id: '4', filename: 'company-profile.pdf', url: '/uploads/company-profile.pdf', type: 'document', size: 1200000, usedIn: ['About Page'], uploadedAt: now },
  { id: '5', filename: 'intro-video.mp4', url: '/uploads/intro-video.mp4', type: 'video', size: 15000000, usedIn: ['Home Page'], uploadedAt: now },
  { id: '6', filename: 'portfolio-web.jpg', url: '/uploads/portfolio-web.jpg', type: 'image', size: 380000, dimensions: { width: 1600, height: 1200 }, usedIn: ['Portfolio'], uploadedAt: now },
  { id: '7', filename: 'case-study.pdf', url: '/uploads/case-study.pdf', type: 'document', size: 890000, usedIn: [], uploadedAt: now },
  { id: '8', filename: 'office-tour.mp4', url: '/uploads/office-tour.mp4', type: 'video', size: 28000000, usedIn: [], uploadedAt: now },
];

const filters = ['All', 'Images', 'Documents', 'Videos'] as const;
type Filter = (typeof filters)[number];

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

const typeIcons: Record<string, string> = { document: '📄', video: '🎬' };

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = media.filter(m => {
    if (filter === 'All') return true;
    if (filter === 'Images') return m.type === 'image';
    if (filter === 'Documents') return m.type === 'document';
    return m.type === 'video';
  });

  const selected = media.find(m => m.id === selectedId);

  const handleDrag = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragIn = (e: DragEvent) => { handleDrag(e); setIsDragging(true); };
  const handleDragOut = (e: DragEvent) => { handleDrag(e); setIsDragging(false); };
  const handleDrop = (e: DragEvent) => { handleDrag(e); setIsDragging(false); /* no actual upload */ };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const remove = (id: string) => {
    setMedia(media.filter(m => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="ms-64 min-h-screen bg-[#F3F2EF]">
      <TopBar title="Media Library" />
      <div className="p-6">
        {/* Upload zone */}
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center mb-6 transition-colors cursor-pointer ${isDragging ? 'border-ruby bg-ruby/5' : 'border-gray-300 hover:border-ruby/50 bg-white'}`}
        >
          <input ref={fileRef} type="file" multiple className="hidden" />
          <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          <p className="text-gray-500 text-sm">Drop files here or click to upload</p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${filter === f ? 'bg-ruby text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedId === m.id ? 'ring-2 ring-ruby' : ''}`}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {m.type === 'image' ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs">{m.filename}</div>
                    ) : (
                      <span className="text-4xl">{typeIcons[m.type]}</span>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-midnight truncate font-medium">{m.filename}</p>
                    <p className="text-xs text-gray-400">{formatSize(m.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 shrink-0 bg-white rounded-xl p-5 shadow-sm h-fit sticky top-20">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {selected.type === 'image' ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">Preview</div>
                ) : (
                  <span className="text-5xl">{typeIcons[selected.type]}</span>
                )}
              </div>
              <h3 className="font-medium text-midnight text-sm mb-3">{selected.filename}</h3>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between"><span>Type</span><span className="text-midnight capitalize">{selected.type}</span></div>
                <div className="flex justify-between"><span>Size</span><span className="text-midnight">{formatSize(selected.size)}</span></div>
                {selected.dimensions && (
                  <div className="flex justify-between"><span>Dimensions</span><span className="text-midnight">{selected.dimensions.width} × {selected.dimensions.height}</span></div>
                )}
                <div>
                  <span className="block mb-1">URL</span>
                  <div className="flex gap-1">
                    <input value={selected.url} readOnly className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs" />
                    <button onClick={() => copyUrl(selected.url)} className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs transition-colors cursor-pointer">
                      {copied ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>
                {selected.usedIn.length > 0 && (
                  <div>
                    <span className="block mb-1">Used in</span>
                    <div className="flex flex-wrap gap-1">
                      {selected.usedIn.map(u => (
                        <span key={u} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{u}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => remove(selected.id)} className="mt-4 w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
