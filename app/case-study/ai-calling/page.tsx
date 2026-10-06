import type { Metadata } from "next";
import { AiCallingCaseStudy } from "@/components/case-study/ai-calling/AiCallingCaseStudy";

export const metadata: Metadata = {
  title: "AI Calling — Case Study | YKSH",
  description:
    "AI-Calling tool for recruiters: how AI lead curation and tracking eliminated manual chaos.",
};

export default function AiCallingCaseStudyPage() {
  return <AiCallingCaseStudy />;
}
