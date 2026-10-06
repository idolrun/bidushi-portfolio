import type { Metadata } from "next";
import { VahaanCaseStudy } from "@/components/case-study/vahaan-ai/VahaanCaseStudy";

export const metadata: Metadata = {
  title: "Vahan.ai Wallet — Case Study | YKSH",
  description:
    "Engineering viral adoption through gamified rewards with behavioral design: the Vahan.ai wallet redesign.",
};

export default function VahaanCaseStudyPage() {
  return <VahaanCaseStudy />;
}
