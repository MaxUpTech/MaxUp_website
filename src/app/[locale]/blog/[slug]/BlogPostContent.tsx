'use client';

import { ReactNode } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export function BlogHeader({ children }: { children: ReactNode }) {
  return <AnimateOnScroll variant="fadeDown">{children}</AnimateOnScroll>;
}

export function BlogBody({ children }: { children: ReactNode }) {
  return <AnimateOnScroll variant="fadeUp" delay={0.15}>{children}</AnimateOnScroll>;
}

export function BlogSection({ children, className }: { children: ReactNode; className?: string }) {
  return <AnimateOnScroll variant="fadeUp" className={className}>{children}</AnimateOnScroll>;
}
