export interface ProcessStep {
  step: number;
  icon: string;           // kept for reference; component uses Lucide mapped by step number
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  timeline?: string;      // e.g., "1–3 business days"
  timelineZh?: string;
  note?: string;
  noteZh?: string;
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
  benefits?: string[];
  benefitsZh?: string[];
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
    timeline: "~15 Business Days",
    benefits: [
      "Full application preparation & document review",
      "Direct consulate submission from our D.C. office",
      "End-to-end tracking until your visa is in hand",
    ],
    benefitsZh: [
      "全程申请准备与文件审核",
      "从我们华盛顿特区办公室直接提交至领事馆",
      "全程跟踪，直至签证到手",
    ],
    requirements: [
      "Valid U.S. passport (6+ months validity beyond travel dates)",
      "Completed China visa application form",
      "Recent passport-sized photo (white background, 2×2 in)",
    ],
    requirementsZh: [
      "有效美国护照（有效期超过旅行日期6个月以上）",
      "填写完整的中国签证申请表",
      "近期护照尺寸照片（白色背景，2×2英寸）",
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
        icon: "📤",
        title: "COVA Application Submission",
        titleZh: "COVA系统提交",
        description:
          "We prepare and submit your application through China's official online visa system (COVA). Most applications are pre-approved on the first submission thanks to our experience.",
        descriptionZh:
          "我们通过中国官方在线签证系统（COVA）准备并提交您的申请。凭借我们的丰富经验，大多数申请在首次提交时即可获得预审通过。",
        timeline: "1–3 business days",
        timelineZh: "1–3个工作日",
      },
      {
        step: 4,
        icon: "🕐",
        title: "Pre-Approval Review",
        titleZh: "预审审核",
        description:
          "The visa office reviews your COVA submission. Pre-approval authorizes your passport to be submitted for final processing — it does not mean the visa has been issued yet.",
        descriptionZh:
          "签证处审核您的COVA申请。预审通过表明您的护照可以提交进行最终处理——并不意味着签证已经签发。",
        timeline: "3–10 business days",
        timelineZh: "3–10个工作日",
        note: "While awaiting pre-approval, we may ask you to mail in your passport so there's no delay once approval comes through.",
        noteZh:
          "在等待预审期间，我们可能会请您提前邮寄护照，以便预审通过后立即处理，不造成延误。",
      },
      {
        step: 5,
        icon: "🏛️",
        title: "Consulate Submission",
        titleZh: "领事馆提交",
        description:
          "We submit your complete application package directly to the Chinese Consulate. Our proximity means faster turnaround.",
        descriptionZh:
          "我们将您的完整申请材料直接提交至中国领事馆。毗邻优势确保更快的处理速度。",
        timeline: "5–10 business days",
        timelineZh: "5–10个工作日",
        note: "Some cases may require additional administrative review at the Embassy's discretion. We notify you as soon as a decision is made.",
        noteZh:
          "部分案例可能需要使馆自行决定是否进行额外的行政审查。我们会在第一时间通知您结果。",
      },
      {
        step: 6,
        icon: "✈️",
        title: "Visa in Hand",
        titleZh: "签证到手",
        description:
          "Your passport is shipped back to you via FedEx with tracking and signature confirmation. Your visa is ready — time to explore China.",
        descriptionZh:
          "您的护照将通过FedEx快递寄回，全程追踪并需签名确认。您的签证已准备好——是时候探索中国了。",
        timeline: "~2 business days (FedEx)",
        timelineZh: "约2个工作日（FedEx）",
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
