import { CaseStudyRequestTitle } from "./CaseStudyRequestTitle";

export function CaseStudyRequestSuccess({ id }: { id: string }) {
  return (
    <>
      <CaseStudyRequestTitle id={id} initial="T">
        HANK YOU
      </CaseStudyRequestTitle>
      <p className="crm-copy" role="status">
        I will email you the case study. Have a lovely day
      </p>
    </>
  );
}
