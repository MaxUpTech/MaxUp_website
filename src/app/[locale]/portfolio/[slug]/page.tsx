import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyContent from './CaseStudyContent';
import type { Locale } from '@/i18n/config';
import { portfolioProjects } from '@/data/portfolio';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const t = await getTranslations('caseStudy');

  const projectIndex = portfolioProjects.findIndex(p => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = portfolioProjects[projectIndex];
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];

  const translations = {
    client: t('client'),
    industry: t('industry'),
    services: t('services'),
    timeline: t('timeline'),
    results: t('results'),
    challenge: t('challenge'),
    solution: t('solution'),
    outcome: t('outcome'),
    nextProject: t('nextProject'),
  };

  return (
    <>
      <Navbar />
      <main className="pb-0">
        <CaseStudyContent
          project={project}
          nextProject={nextProject}
          locale={loc}
          t={translations}
        />
      </main>
      <Footer />
    </>
  );
}
