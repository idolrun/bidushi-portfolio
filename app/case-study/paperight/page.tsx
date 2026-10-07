import type { Metadata } from "next";
import { PaperightCaseStudy } from "@/components/case-study/paperight/PaperightCaseStudy";

export const metadata: Metadata = {
  title: "Paperight — Case Study | YKSH",
  description:
    "Paperight: an AI auditor for final year reports, and how hierarchical chunking cut AI hallucinations.",
};

export default function PaperightCaseStudyPage() {
  return <PaperightCaseStudy />;
}
