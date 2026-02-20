interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <>
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-start relative">
        {/* Connecting line */}
        <div className="absolute top-5 start-0 end-0 h-0.5 bg-gray-200" />
        {steps.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center relative px-4">
            <div className="w-10 h-10 rounded-full bg-ruby text-white flex items-center justify-center font-bold text-sm relative z-10">
              {step.number}
            </div>
            <h3 className="font-bold text-midnight mt-4 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-ruby text-white flex items-center justify-center font-bold text-sm shrink-0">
                {step.number}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-2" />}
            </div>
            <div className="pb-2">
              <h3 className="font-bold text-midnight mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
