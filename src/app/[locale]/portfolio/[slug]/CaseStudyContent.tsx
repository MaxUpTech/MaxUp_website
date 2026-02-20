'use client';

import { Link } from '@/i18n/routing';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import ImageGallery from '@/components/ImageGallery';
import type { Locale } from '@/i18n/config';

interface Props {
  project: any;
  nextProject: any;
  locale: Locale;
  t: Record<string, string>;
}

export default function CaseStudyContent({ project, nextProject, locale: loc, t }: Props) {
  return (
    <>
      {/* Hero Image */}
      <section className="px-6 pt-8">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fadeUp">
            <div className="h-[300px] md:h-[500px] bg-gray-100 rounded-2xl" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Left – Meta Card */}
          <AnimateOnScroll variant="fadeLeft" className="lg:w-[40%]">
            <div className="bg-off-white rounded-2xl p-8 sticky top-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.client}</p>
                  <p className="font-bold text-midnight">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.industry}</p>
                  <p className="font-bold text-midnight">{project.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.services}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.servicesProvided.map((s: string) => (
                      <span key={s} className="bg-white border border-gray-200 text-sm px-3 py-1 rounded-full text-gray-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.timeline}</p>
                  <p className="font-bold text-midnight">{project.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-3">{t.results}</p>
                  <div className="space-y-3">
                    {project.metrics.map((m: any, i: number) => (
                      <div key={i} className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-ruby">{m.value}</span>
                        <span className="text-sm text-gray-600">{m.label[loc]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right – Narrative */}
          <AnimateOnScroll variant="fadeRight" delay={0.15} className="lg:w-[60%] space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight">{project.title[loc]}</h2>

            <div>
              <h3 className="text-xl font-bold text-midnight mb-3">{t.challenge}</h3>
              <p className="text-gray-600 leading-relaxed">{project.challenge[loc]}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midnight mb-3">{t.solution}</h3>
              <p className="text-gray-600 leading-relaxed">{project.solution[loc]}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midnight mb-3">{t.outcome}</h3>
              <p className="text-gray-600 leading-relaxed">{project.outcome[loc]}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fadeUp">
            <ImageGallery images={project.galleryImages} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="bg-off-white py-16 px-6">
          <AnimateOnScroll variant="scaleUp" className="max-w-4xl mx-auto text-center">
            <svg className="w-12 h-12 text-ruby/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl text-midnight font-medium leading-relaxed mb-6">
              &ldquo;{project.testimonial.quote[loc]}&rdquo;
            </blockquote>
            <p className="font-bold text-midnight">{project.testimonial.clientName}</p>
            <p className="text-sm text-gray-500">{project.testimonial.company}</p>
          </AnimateOnScroll>
        </section>
      )}

      {/* Next Project */}
      <section className="bg-midnight py-16 px-6">
        <AnimateOnScroll variant="fadeUp" className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-3">{t.nextProject}</p>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="inline-block group"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-ruby transition-colors">
              {nextProject.title[loc]}
            </h3>
            <span className="text-gray-400 text-sm mt-2 inline-block">{nextProject.category}</span>
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
