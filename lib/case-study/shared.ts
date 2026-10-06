export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type CaseStudyPhone = Omit<CaseStudyImage, "caption">;

export type CaseStudyOverviewData = {
  heading: string;
  paragraphs: string[];
  meta: { label: string; value: string[] }[];
};

/** Same blurb and metadata on every Vahan case study. */
export const CASE_STUDY_OVERVIEW: CaseStudyOverviewData = {
  heading: "VAHAN.AI",
  paragraphs: [
    "Vahan is a startup focused on gig working industry, it has placed more that 3 million people to work with its partners like Swiggy, Zepto (Y17) ,Zomato.",
    "The wallet was its full service to provide riders within Indian major cities with incentives and help create a networking recruitment.",
  ],
  meta: [
    { label: "My Role", value: ["Senior Product Designer"] },
    { label: "Country", value: ["Bangalore, India"] },
    { label: "Timeline", value: ["2024–2025", "1 year"] },
    { label: "Team", value: ["UX Researcher, PM, 2 Engineers"] },
  ],
};
