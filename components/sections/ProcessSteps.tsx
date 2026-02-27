import { MessageSquare, FileText, Upload, Clock, Building2, Plane, type LucideIcon } from "lucide-react";
import { type ProcessStep } from "@/data/services";

interface ProcessStepsProps {
  steps: ProcessStep[];
  locale: string;
}

const STEP_ICONS: LucideIcon[] = [MessageSquare, FileText, Upload, Clock, Building2, Plane];

const STAGE_LABELS = {
  stage1: {
    en: "Stage 1 — Online Application & Pre-Approval",
    zh: "第一阶段 — 在线申请与预审",
  },
  stage2: {
    en: "Stage 2 — Embassy Processing & Visa Issuance",
    zh: "第二阶段 — 使馆处理与签证签发",
  },
};

function StageLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-0.5 h-5 bg-red-primary rounded-full flex-shrink-0" />
      <p className="text-xs text-muted uppercase tracking-wider font-medium">{label}</p>
    </div>
  );
}

function StepCard({ step, locale }: { step: ProcessStep; locale: string }) {
  const Icon = STEP_ICONS[step.step - 1] ?? MessageSquare;

  return (
    <div className="flex items-start gap-4">
      {/* Icon badge */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-primary/15 border border-red-primary/30 flex items-center justify-center">
        <Icon className="w-4 h-4 text-red-primary" />
      </div>
      <div className="flex-1 min-w-0">
        {/* Step label */}
        <p className="text-xs text-muted uppercase tracking-wide mb-0.5">Step {step.step}</p>
        {/* Title + timeline badge */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h4 className="font-display text-base font-semibold text-foreground">
            {locale === "zh" ? step.titleZh : step.title}
          </h4>
          {step.timeline && (
            <span className="bg-red-950 text-red-400 border border-red-800 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
              {locale === "zh" && step.timelineZh ? step.timelineZh : step.timeline}
            </span>
          )}
        </div>
        {/* Description */}
        <p className="text-sm text-muted leading-relaxed">
          {locale === "zh" ? step.descriptionZh : step.description}
        </p>
        {/* Subtle note */}
        {step.note && (
          <p className="text-sm text-muted mt-2 leading-relaxed">
            {locale === "zh" && step.noteZh ? step.noteZh : step.note}
          </p>
        )}
      </div>
    </div>
  );
}

export function ProcessSteps({ steps, locale }: ProcessStepsProps) {
  const stage1 = steps.filter((s) => s.step <= 4);
  const stage2 = steps.filter((s) => s.step >= 5);
  const isZh = locale === "zh";

  return (
    <div>
      {/* Stage 1 */}
      <StageLabel label={isZh ? STAGE_LABELS.stage1.zh : STAGE_LABELS.stage1.en} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {stage1.map((step) => (
          <StepCard key={step.step} step={step} locale={locale} />
        ))}
      </div>

      {/* Stage 2 */}
      <StageLabel label={isZh ? STAGE_LABELS.stage2.zh : STAGE_LABELS.stage2.en} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stage2.map((step) => (
          <StepCard key={step.step} step={step} locale={locale} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-surface border border-white/10 rounded-xl px-5 py-4 flex items-start gap-3">
        <span className="text-muted/60 flex-shrink-0 mt-0.5 text-sm">ℹ</span>
        <p className="text-sm text-muted">
          {isZh
            ? "处理时间因季节和使馆工作量而有所不同。以上时间为典型情况的估算，实际时间可能更短或更长。"
            : "Processing times vary by season and Embassy workload. Estimates above reflect typical cases. Actual times may be shorter or longer."}
        </p>
      </div>
    </div>
  );
}
