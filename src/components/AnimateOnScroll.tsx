'use client';
import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'none';

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  /** @deprecated Use variant instead */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  staggerChildren?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'ul';
}

const variantMap: Record<AnimationVariant, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  fadeUp:    { hidden: { opacity: 0, y: 40 },   visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -40 },  visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -40 },  visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 40 },   visible: { opacity: 1, x: 0 } },
  scaleUp:   { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  none:      { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

// Map legacy direction prop to new variants
const directionToVariant: Record<string, AnimationVariant> = {
  up: 'fadeUp',
  down: 'fadeDown',
  left: 'fadeLeft',
  right: 'fadeRight',
  none: 'none',
};

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  variant,
  direction,
  staggerChildren,
  style,
  as = 'div',
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedVariant = variant || (direction ? directionToVariant[direction] : 'fadeUp');
  const v = variantMap[resolvedVariant];

  if (prefersReduced) {
    const Tag = as as any;
    return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion[as] as any;

  const containerVariants: Variants = staggerChildren
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  const childVariants: Variants | undefined = staggerChildren
    ? {
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }
    : undefined;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {staggerChildren
        ? Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : children
        : children}
    </MotionTag>
  );
}
