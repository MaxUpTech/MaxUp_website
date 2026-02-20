import { Link } from '@/i18n/routing';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm flex items-center gap-2 flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-400" aria-hidden="true">›</span>}
            {isLast || !item.href ? (
              <span className="text-midnight font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-gray-400 hover:text-gray-600 transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
