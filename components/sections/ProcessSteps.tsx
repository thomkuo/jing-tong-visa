import { type ProcessStep } from "@/data/services";

interface ProcessStepsProps {
  steps: ProcessStep[];
  locale: string;
}

export function ProcessSteps({ steps, locale }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.step} className="relative">
          {/* Step number connector line (desktop only, between columns) */}
          <div className="flex items-start gap-4">
            {/* Number badge */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-primary flex items-center justify-center text-white font-bold text-sm">
              {step.step}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl mb-2">{step.icon}</div>
              <h4 className="font-display text-base font-semibold text-foreground mb-1.5">
                {locale === "zh" ? step.titleZh : step.title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {locale === "zh" ? step.descriptionZh : step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
