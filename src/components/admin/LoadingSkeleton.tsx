'use client';

export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="animate-pulse">
        <div className="border-b border-gray-200 px-4 py-3 flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border-b border-gray-100 px-4 py-4 flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-3 bg-gray-100 rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-10 bg-gray-100 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-20 bg-gray-100 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-10 bg-gray-100 rounded" />
    </div>
  );
}
