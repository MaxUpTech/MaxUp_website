'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | '...')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const btn = "h-10 min-w-[40px] px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btn} border border-gray-200 text-gray-600 hover:bg-gray-100`}
      >
        ‹ Prev
      </button>

      <div className="hidden md:flex items-center gap-1">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${btn} ${p === currentPage ? 'bg-ruby text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <span className="md:hidden text-sm text-gray-600">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btn} border border-gray-200 text-gray-600 hover:bg-gray-100`}
      >
        Next ›
      </button>
    </div>
  );
}
