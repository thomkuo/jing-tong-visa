export interface ProcessStep {
  step: number;
  icon: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  active: boolean;
  timeline?: string;
  requirements?: string[];
  requirementsZh?: string[];
  processSteps?: ProcessStep[];
}

export const services: Service[] = [
  {
    id: "tourist-visa",
    slug: "tourist-visa",
    name: "Tourist Visa (L Visa)",
    nameZh: "旅游签证（L签证）",
    description:
      "Planning a trip to China? We handle every step of your tourist visa application — from document review to consulate submission — ensuring a smooth, stress-free experience.",
    descriptionZh:
      "计划前往中国旅游？我们处理您旅游签证申请的每个步骤——从文件审核到领事馆提交——确保顺畅无忧的体验。",
    active: true,
    timeline: "5–10 Business Days",
    requirements: [
      "Valid U.S. passport (6+ months validity beyond travel dates)",
      "Completed China visa application form",
      "Recent passport-sized photo (white background, 2×2 in)",
      "Hotel booking confirmation or invitation letter",
      "Round-trip flight itinerary",
      "Bank statements (last 3 months)",
    ],
    requirementsZh: [
      "有效美国护照（有效期超过旅行日期6个月以上）",
      "填写完整的中国签证申请表",
      "近期护照尺寸照片（白色背景，2×2英寸）",
      "酒店预订确认或邀请函",
      "往返机票行程单",
      "银行流水单（近3个月）",
    ],
    processSteps: [
      {
        step: 1,
        icon: "📋",
        title: "Free Consultation",
        titleZh: "免费咨询",
        description:
          "Contact us to discuss your travel plans. We assess your eligibility and answer any questions about the process.",
        descriptionZh:
          "联系我们讨论您的旅行计划。我们评估您的资格并解答您对申请流程的任何疑问。",
      },
      {
        step: 2,
        icon: "📁",
        title: "Document Collection",
        titleZh: "文件收集",
        description:
          "We provide a personalized document checklist based on your situation. Gather your documents at your own pace.",
        descriptionZh:
          "我们根据您的具体情况提供个性化文件清单。您可以按自己的节奏准备所需文件。",
      },
      {
        step: 3,
        icon: "🔍",
        title: "Expert Review",
        titleZh: "专业审核",
        description:
          "Our team meticulously reviews every document — catching errors before they reach the consulate and cause delays.",
        descriptionZh:
          "我们的团队仔细审查每份文件——在提交领事馆前发现并纠正错误，避免不必要的延误。",
      },
      {
        step: 4,
        icon: "🏛️",
        title: "Consulate Submission",
        titleZh: "领事馆提交",
        description:
          "We submit your complete application package directly to the Chinese Consulate. Our proximity means faster turnaround.",
        descriptionZh:
          "我们将您的完整申请材料直接提交至中国领事馆。毗邻优势确保更快的处理速度。",
      },
      {
        step: 5,
        icon: "🔔",
        title: "Tracking & Updates",
        titleZh: "跟踪与更新",
        description:
          "We monitor your application status and keep you informed at every stage. No uncertainty, no surprises.",
        descriptionZh:
          "我们全程跟踪您的申请状态，随时向您汇报进展。无不确定性，无意外情况。",
      },
      {
        step: 6,
        icon: "✈️",
        title: "Visa in Hand",
        titleZh: "签证到手",
        description:
          "Your passport is returned with your visa stamp. You're ready to explore China — bon voyage!",
        descriptionZh:
          "您的护照贴上签证章后归还给您。您已准备好探索中国——祝您旅途愉快！",
      },
    ],
  },
  {
    id: "student-visa",
    slug: "student-visa",
    name: "Student Visa (X Visa)",
    nameZh: "学生签证（X签证）",
    description:
      "Comprehensive support for student visa applications, including JW201/JW202 form assistance and enrollment documentation.",
    descriptionZh:
      "全面支持学生签证申请，包括JW201/JW202表格协助和入学文件准备。",
    active: false,
  },
  {
    id: "family-visa",
    slug: "family-visa",
    name: "Family Reunion Visa (S Visa)",
    nameZh: "家庭团聚签证（S签证）",
    description:
      "Reunite with family in China. We guide you through the S-visa requirements and help prepare all required documentation.",
    descriptionZh:
      "与在中国的家人团聚。我们指导您完成S签证要求并协助准备所有所需文件。",
    active: false,
  },
  {
    id: "business-visa",
    slug: "business-visa",
    name: "Business Visa (M Visa)",
    nameZh: "商务签证（M签证）",
    description:
      "Fast-track your business visa application with expert guidance, document preparation, and consulate submission support.",
    descriptionZh:
      "通过专业指导、文件准备和领事馆提交支持，快速处理您的商务签证申请。",
    active: false,
  },
];
