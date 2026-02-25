export interface PricingFeature {
  text: string;
  textZh: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  nameZh: string;
  price: number;
  description: string;
  descriptionZh: string;
  features: PricingFeature[];
  recommended?: boolean;
  badge?: string;
  badgeZh?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    nameZh: "基础服务",
    price: 89,
    description:
      "Ideal for straightforward applications. We review your documents and guide you — you submit to the consulate.",
    descriptionZh:
      "适合申请流程较简单的申请人。我们审核您的文件并提供指导——您自行前往领事馆提交。",
    features: [
      { text: "Eligibility assessment", textZh: "资格评估", included: true },
      { text: "Personalized document checklist", textZh: "个性化文件清单", included: true },
      { text: "Application form guidance", textZh: "申请表填写指导", included: true },
      { text: "Photo requirements review", textZh: "照片规格审核", included: true },
      { text: "Document review (one round)", textZh: "文件审核（一次）", included: true },
      { text: "Email support", textZh: "电子邮件支持", included: true },
      { text: "Consulate submission by us", textZh: "代理提交至领事馆", included: false },
      { text: "Application tracking", textZh: "申请状态跟踪", included: false },
      { text: "Priority phone support", textZh: "优先电话支持", included: false },
      { text: "Expedited processing option", textZh: "加急处理选项", included: false },
    ],
  },
  {
    id: "full-service",
    name: "Full Service",
    nameZh: "全程服务",
    price: 149,
    description:
      "Complete, stress-free visa processing. We handle everything from document preparation to consulate submission.",
    descriptionZh:
      "全程无忧的签证处理服务。从文件准备到领事馆提交，我们一手包办。",
    recommended: true,
    badge: "Most Popular",
    badgeZh: "最受欢迎",
    features: [
      { text: "Eligibility assessment", textZh: "资格评估", included: true },
      { text: "Personalized document checklist", textZh: "个性化文件清单", included: true },
      { text: "Application form completion", textZh: "协助填写申请表", included: true },
      { text: "Photo requirements review", textZh: "照片规格审核", included: true },
      { text: "Thorough document review (multiple rounds)", textZh: "全面文件审核（多轮）", included: true },
      { text: "Email & phone support", textZh: "电话及电子邮件支持", included: true },
      { text: "Consulate submission by us", textZh: "代理提交至领事馆", included: true },
      { text: "Application tracking", textZh: "申请状态跟踪", included: true },
      { text: "Priority phone support", textZh: "优先电话支持", included: true },
      { text: "Expedited processing option", textZh: "加急处理选项", included: true },
    ],
  },
];
