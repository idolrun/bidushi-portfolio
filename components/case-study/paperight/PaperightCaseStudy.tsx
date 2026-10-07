"use client";

import { CaseStudyHero, DISPLAY_FONT } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNextLink } from "@/components/case-study/CaseStudyNextLink";
import { CaseStudyOverview } from "@/components/case-study/CaseStudyOverview";
import { CaseStudyProse } from "@/components/case-study/CaseStudyProse";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { PaperightFeedback } from "@/components/case-study/paperight/PaperightFeedback";
import { PaperightImpact } from "@/components/case-study/paperight/PaperightImpact";
import { PaperightProcess } from "@/components/case-study/paperight/PaperightProcess";
import { PaperightUx } from "@/components/case-study/paperight/PaperightUx";
import {
  PAPERIGHT_HERO,
  PAPERIGHT_OVERVIEW,
  PAPERIGHT_PROBLEM,
  PAPERIGHT_TOC,
} from "@/lib/case-study/paperight";
import { AI_CALLING_PROJECT } from "@/lib/works/projects";

export function PaperightCaseStudy() {
  return (
    <CaseStudyShell
      toc={PAPERIGHT_TOC}
      hero={
        <CaseStudyHero
          ariaLabel="AI for Education. Paperight"
          wordmark={
            <span className="whitespace-nowrap text-[0.6em]">
              <span className={`${DISPLAY_FONT} font-normal italic`}>AI F</span>OR{" "}
              <span className={`${DISPLAY_FONT} font-normal italic`}>E</span>DUCATION
            </span>
          }
          phones={PAPERIGHT_HERO.phones}
          sibling={{
            href: AI_CALLING_PROJECT.caseStudyHref,
            ariaLabel: "AI Calling case study",
            label: (
              <>
                <span className={`${DISPLAY_FONT} italic`}>C</span>ALLING
              </>
            ),
          }}
        />
      }
      footer={
        <CaseStudyNextLink
          direction="prev"
          href={AI_CALLING_PROJECT.caseStudyHref}
          label="View AI Calling Case Study"
        />
      }
    >
      <CaseStudyOverview overview={PAPERIGHT_OVERVIEW} />
      <CaseStudyProse id="problem" {...PAPERIGHT_PROBLEM} />
      <PaperightProcess />
      <PaperightImpact />
      <PaperightUx />
      <PaperightFeedback />
    </CaseStudyShell>
  );
}
