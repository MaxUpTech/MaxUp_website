'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AnimatedCounter from '@/components/AnimatedCounter';

const statKeys = ['projects', 'years', 'clients', 'satisfaction'] as const;
const statTargets: Record<string, { target: number; suffix: string }> = {
  projects: { target: 200, suffix: '+' },
  years: { target: 5, suffix: '+' },
  clients: { target: 150, suffix: '+' },
  satisfaction: { target: 98, suffix: '%' },
};

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  const members = t.raw('team.members') as Array<{ name: string; role: string; bio: string }>;
  const values = t.raw('values.items') as Array<{ title: string; description: string }>;
  const milestones = t.raw('timeline.milestones') as Array<{ year: string; title: string; description: string }>;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-off-white py-20 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{t('heroTitle')}</h1>
              <p className="text-gray-600 text-lg">{t('heroSubtitle')}</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl font-bold text-midnight mb-6">{t('storyTitle')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t('storyP1')}</p>
              <p className="text-gray-600 leading-relaxed">{t('storyP2')}</p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <AnimateOnScroll variant="fadeUp" staggerChildren={0.1} className="mx-auto max-w-5xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statKeys.map((key) => (
              <div key={key} className="border border-gray-200 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-ruby mb-2">
                  <AnimatedCounter
                    target={statTargets[key]?.target ?? 0}
                    suffix={statTargets[key]?.suffix ?? ''}
                  />
                </div>
                <div className="text-gray-600">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </AnimateOnScroll>
        </section>

        {/* Team */}
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-6xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl font-bold text-midnight text-center mb-12">{t('team.title')}</h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-midnight mb-1">{member.name}</h3>
                  <p className="text-ruby text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl font-bold text-midnight text-center mb-12">{t('values.title')}</h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeUp" staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4" />
                  <h3 className="font-bold text-midnight mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-3xl px-6">
            <AnimateOnScroll variant="fadeUp">
              <h2 className="text-3xl font-bold text-midnight text-center mb-12">{t('timeline.title')}</h2>
            </AnimateOnScroll>
            <div className="border-s-2 border-gray-200 ms-2">
              {milestones.map((m, i) => (
                <AnimateOnScroll key={i} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
                  <div className="relative ps-8 pb-12">
                    <div className="absolute w-4 h-4 bg-ruby rounded-full -start-2 top-1" />
                    <span className="text-ruby font-bold">{m.year}</span>
                    <h3 className="font-bold text-midnight mt-1 mb-1">{m.title}</h3>
                    <p className="text-gray-600 text-sm">{m.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
