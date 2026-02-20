import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface Project {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl hover-lift"
    >
      <Image
        src={project.heroImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/70 transition-colors duration-300 flex items-end p-6">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <p className="text-sm text-ruby mb-1">{project.category}</p>
          <h3 className="text-lg font-bold">{project.title}</h3>
        </div>
      </div>
    </Link>
  );
}
