'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineSkeleton />,
});

function SplineSkeleton() {
  return (
    <div className="w-full h-full rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gray-200 animate-ping" />
    </div>
  );
}

interface SplineSceneProps {
  sceneUrl: string;
  fallbackImage?: string;
  className?: string;
}

export default function SplineScene({ sceneUrl, fallbackImage, className = '' }: SplineSceneProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'error' : prev));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onLoad = useCallback(() => {
    setStatus('ready');
  }, []);

  if (status === 'error') {
    if (fallbackImage) {
      return (
        <div className={`w-full h-full ${className}`}>
          <img src={fallbackImage} alt="" className="w-full h-full object-cover rounded-2xl" />
        </div>
      );
    }
    // Will be replaced by parent with HeroFallback
    return null;
  }

  return (
    <div className={`w-full h-full relative ${className}`} style={{ willChange: 'transform' }}>
      {status === 'loading' && (
        <div className="absolute inset-0 z-10">
          <SplineSkeleton />
        </div>
      )}
      <Spline scene={sceneUrl} onLoad={onLoad} className="w-full h-full" />
    </div>
  );
}
