import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
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

  return (
    <>
      <Navbar />
      <main className="pb-0">
        {/* Hero Image */}
        <section className="px-6 pt-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-[300px] md:h-[500px] bg-gray-100 rounded-2xl" />
          </div>
        </section>

        {/* Content */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* Left – Meta Card */}
            <div className="lg:w-[40%]">
              <div className="bg-off-white rounded-2xl p-8 sticky top-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('client')}</p>
                    <p className="font-bold text-midnight">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('industry')}</p>
                    <p className="font-bold text-midnight">{project.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('services')}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.servicesProvided.map((s) => (
                        <span key={s} className="bg-white border border-gray-200 text-sm px-3 py-1 rounded-full text-gray-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('timeline')}</p>
                    <p className="font-bold text-midnight">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-3">{t('results')}</p>
                    <div className="space-y-3">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex items-baseline gap-3">
                          <span className="text-2xl font-bold text-ruby">{m.value}</span>
                          <span className="text-sm text-gray-600">{m.label[loc]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – Narrative */}
            <div className="lg:w-[60%] space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight">{project.title[loc]}</h2>

              <div>
                <h3 className="text-xl font-bold text-midnight mb-3">{t('challenge')}</h3>
                <p className="text-gray-600 leading-relaxed">{project.challenge[loc]}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-midnight mb-3">{t('solution')}</h3>
                <p className="text-gray-600 leading-relaxed">{project.solution[loc]}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-midnight mb-3">{t('outcome')}</h3>
                <p className="text-gray-600 leading-relaxed">{project.outcome[loc]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <ImageGallery images={project.galleryImages} />
          </div>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="bg-off-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <svg className="w-12 h-12 text-ruby/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl md:text-2xl text-midnight font-medium leading-relaxed mb-6">
                &ldquo;{project.testimonial.quote[loc]}&rdquo;
              </blockquote>
              <p className="font-bold text-midnight">{project.testimonial.clientName}</p>
              <p className="text-sm text-gray-500">{project.testimonial.company}</p>
            </div>
          </section>
        )}

        {/* Next Project */}
        <section className="bg-midnight py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-sm mb-3">{t('nextProject')}</p>
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="inline-block group"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-ruby transition-colors">
                {nextProject.title[loc]}
              </h3>
              <span className="text-gray-400 text-sm mt-2 inline-block">{nextProject.category}</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
