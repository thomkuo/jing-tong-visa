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
      "Valid US passport (6+ months validity)",
      "Completed visa application form",
      "Recent passport-sized photo",
      "Hotel booking confirmation or invitation letter",
      "Round-trip flight itinerary",
      "Bank statements (last 3 months)",
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
