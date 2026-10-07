"use client";

import { AiCallingImpact } from "@/components/case-study/ai-calling/AiCallingImpact";
import { AiCallingResearch } from "@/components/case-study/ai-calling/AiCallingResearch";
import { CaseStudyHero, DISPLAY_FONT } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNextLink } from "@/components/case-study/CaseStudyNextLink";
import { CaseStudyOverview } from "@/components/case-study/CaseStudyOverview";
import { CaseStudyProse } from "@/components/case-study/CaseStudyProse";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import {
  AI_CALLING_HERO,
  AI_CALLING_PROBLEM,
  AI_CALLING_TOC,
} from "@/lib/case-study/ai-calling";
import { CASE_STUDY_OVERVIEW } from "@/lib/case-study/shared";
import { PAPERIGHT_PROJECT, VAHAAN_PROJECT } from "@/lib/works/projects";

export function AiCallingCaseStudy() {
  return (
    <CaseStudyShell
      toc={AI_CALLING_TOC}
      hero={
        <CaseStudyHero
          ariaLabel="AI Calling. AI-Calling tool for recruiters"
          wordmark={
            <>
              <span className={`${DISPLAY_FONT} font-normal italic`}>AI C</span>ALLING
            </>
          }
          title={AI_CALLING_HERO.title}
          subtitle={AI_CALLING_HERO.subtitle}
          phones={AI_CALLING_HERO.phones}
          sibling={{
            href: VAHAAN_PROJECT.caseStudyHref,
            ariaLabel: "Wallet case study",
            label: (
              <>
                <span className={`${DISPLAY_FONT} italic`}>W</span>ALLET
              </>
            ),
          }}
        />
      }
      footer={
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:gap-6">
          <CaseStudyNextLink
            direction="prev"
            href={VAHAAN_PROJECT.caseStudyHref}
            label="View VAHAN.AI Case Study"
          />
          <CaseStudyNextLink
            direction="next"
            href={PAPERIGHT_PROJECT.caseStudyHref}
            label="Explore Paperight Case Study"
          />
        </div>
      }
    >
      <CaseStudyOverview overview={CASE_STUDY_OVERVIEW} />
      <CaseStudyProse id="problem" {...AI_CALLING_PROBLEM} />
      <AiCallingResearch />
      <AiCallingImpact />
    </CaseStudyShell>
  );
}
