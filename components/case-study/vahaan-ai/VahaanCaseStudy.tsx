"use client";

import { CaseStudyHero, DISPLAY_FONT } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNextLink } from "@/components/case-study/CaseStudyNextLink";
import { CaseStudyOverview } from "@/components/case-study/CaseStudyOverview";
import { CaseStudyProse } from "@/components/case-study/CaseStudyProse";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { VahaanBehaviorAnalysis } from "@/components/case-study/vahaan-ai/VahaanBehaviorAnalysis";
import { VahaanDesignProcess } from "@/components/case-study/vahaan-ai/VahaanDesignProcess";
import { VahaanImpact } from "@/components/case-study/vahaan-ai/VahaanImpact";
import { CASE_STUDY_OVERVIEW } from "@/lib/case-study/shared";
import { VAHAAN_HERO, VAHAAN_PROBLEM, VAHAAN_TOC } from "@/lib/case-study/vahaan";
import { AI_CALLING_PROJECT } from "@/lib/works/projects";

export function VahaanCaseStudy() {
  return (
    <CaseStudyShell
      toc={VAHAAN_TOC}
      hero={
        <CaseStudyHero
          ariaLabel="Wallet. The adoption problem"
          wordmark={
            <>
              <span className={`${DISPLAY_FONT} font-normal italic`}>W</span>ALLET
            </>
          }
          title={VAHAAN_HERO.title}
          subtitle={VAHAAN_HERO.subtitle}
          phones={VAHAAN_HERO.phones}
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
          direction="next"
          href={AI_CALLING_PROJECT.caseStudyHref}
          label="Explore AI Calling Case Study"
        />
      }
    >
      <CaseStudyOverview overview={CASE_STUDY_OVERVIEW} />
      <CaseStudyProse id="problem" {...VAHAAN_PROBLEM} />
      <VahaanBehaviorAnalysis />
      <VahaanDesignProcess />
      <VahaanImpact />
    </CaseStudyShell>
  );
}
