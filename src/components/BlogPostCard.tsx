import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  featuredImage: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block hover-lift rounded-2xl overflow-hidden bg-white border border-gray-200">
      <div className="relative aspect-video">
        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <span className="inline-block bg-ruby text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
          {post.category}
        </span>
        <h3 className="font-bold text-midnight text-lg mb-2 group-hover:text-ruby transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
