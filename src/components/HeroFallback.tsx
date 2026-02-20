export default function HeroFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-midnight/5 ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Floating circle - Ruby */}
        <circle cx="200" cy="180" r="80" fill="#C8102E" opacity="0.15" className="animate-float" />
        {/* Pulsing ring - Midnight */}
        <circle cx="280" cy="260" r="50" stroke="#0C1446" strokeWidth="2" fill="none" opacity="0.2" className="animate-pulse-slow" />
        {/* Small accent */}
        <circle cx="120" cy="300" r="30" fill="#0C1446" opacity="0.1" className="animate-float-delayed" />
        {/* Abstract blob */}
        <ellipse cx="300" cy="120" rx="60" ry="40" fill="#C8102E" opacity="0.1" className="animate-pulse-slow" />
        {/* Dot grid accent */}
        <circle cx="160" cy="100" r="6" fill="#C8102E" opacity="0.25" className="animate-float-delayed" />
        <circle cx="340" cy="320" r="8" fill="#0C1446" opacity="0.15" className="animate-float" />
      </svg>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(4px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
