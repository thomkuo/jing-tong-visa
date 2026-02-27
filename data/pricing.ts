export interface PricingItem {
  text: string;
  textZh: string;
}

export const pricing = {
  standard: { price: 250, minPeople: 1, maxPeople: 3 },
  group:    { price: 220, minPeople: 4 },
  includes: [
    { text: "Chinese Embassy visa fee ($140 value)",           textZh: "中国大使馆签证费（价值$140）" },
    { text: "Professional document review",                    textZh: "专业文件审核" },
    { text: "Application form preparation",                    textZh: "申请表格填写准备" },
    { text: "Consulate submission by our team",                textZh: "由我们团队代为提交领事馆" },
    { text: "Application tracking & updates",                  textZh: "申请进度跟踪与更新" },
    { text: "Return FedEx shipping to you",                    textZh: "FedEx快递寄回您手中" },
  ] as PricingItem[],
  excludes: [
    { text: "Inbound shipping to our D.C. office (cost varies by carrier and location)",
      textZh: "寄送至我们华盛顿特区办公室的快递费（因快递公司和地点而异）" },
  ] as PricingItem[],
};
