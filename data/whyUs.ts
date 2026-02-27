export interface WhyUsFeature {
  id: string;
  icon: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
}

export const whyUsFeatures: WhyUsFeature[] = [
  {
    id: "consulate-proximity",
    icon: "📍",
    title: "D.C. Based",
    titleZh: "毗邻领事馆",
    description:
      "Our office is located close to the Chinese Consulate in Washington D.C. We know their requirements inside and out.",
    descriptionZh:
      "我们的办公室距离华盛顿特区中国领事馆不到一英里。我们对领事馆的要求了如指掌。",
  },
  {
    id: "personalized-service",
    icon: "🤝",
    title: "Personalized Service",
    titleZh: "个性化服务",
    description:
      "Every client receives dedicated, one-on-one attention. We review your specific situation and prepare a tailored application.",
    descriptionZh:
      "每位客户都享受专属的一对一服务。我们审查您的具体情况，准备量身定制的申请材料。",
  },
  {
    id: "document-review",
    icon: "✅",
    title: "Thorough Document Review",
    titleZh: "严格文件审核",
    description:
      "We meticulously review every document before submission to minimize rejection risk and prevent costly delays.",
    descriptionZh:
      "我们在提交前仔细审查每份文件，以最大程度降低拒签风险，避免不必要的延误。",
  },
];
