/** Source copy, including the original typos. */
import type { RailTocItem } from "@/components/ui/rail-toc";
import type {
  CaseStudyImage,
  CaseStudyOverviewData,
  CaseStudyPhone,
} from "@/lib/case-study/shared";

export const PAPERIGHT_TOC: RailTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "process", label: "Design Process" },
  { id: "impact", label: "Impact & Learning" },
  { id: "ux", label: "UX Challenge" },
  { id: "feedback", label: "Feedback" },
];

export const PAPERIGHT_HERO = {
  phones: [
    {
      src: "/images/paperight-ai-for-education.webp",
      alt: "Paperight mission page: adaptive learning intelligence that can analyze, guide and identify the gaps",
      width: 926,
      height: 1050,
    },
  ] satisfies CaseStudyPhone[],
};

export const PAPERIGHT_OVERVIEW: CaseStudyOverviewData = {
  heading: "PAPERIGHT.AI",
  paragraphs: [
    "How we reduced AI hallucinations through hierarchical chunking . It was buuild for students to use internally at Deerwalk Insititue Of technology to make less mistakes in guidelines and rules.",
  ],
  meta: [
    { label: "My Role", value: ["AI team lead"] },
    { label: "Country", value: ["Kathmandu,Nepal"] },
    { label: "Timeline", value: ["2025-2026", "6 Months"] },
    { label: "Team", value: ["4 software Developers, 1 Engineer, 1 Data Analyst"] },
  ],
};

export const PAPERIGHT_PROBLEM = {
  heading: "The Problem",
  paragraphs: [
    "Paperight.ai ( Product of Deerwalk Group) , built as an AI auditor tool to help 4th year Computer science student to find structural gaps and missing formatting guidelines in their report. After launch on the 9th of January we saw a 1000+ visits and 70 users signing up from 26 different colleges across Nepal.",
    "However, we saw the AI getting worse in hallucinating inn between report sections. This was a red flag came when the agent Juno was giving feedback was a bit puzzling. We found we giving her a different kind of guidelines then we were we supposed to for further the learning pattern.",
  ],
};

export const PAPERIGHT_PROCESS = {
  heading: "Overview of my design process",
  intro:
    "As the founding designer of the AI- team, I led end-to-end product design, conducted user research with 20+ students, architected the design for LCE (Logical Continuity Engine) system. Here are the key stages.",
  blocks: [
    {
      heading: "Investigating :",
      body: "Students did not fear the report , they feared red ink marking in their report with structure then content. We collected about 300 reports from previous years.The initial stage involved several steps, the agent needed to analyze 60+ academic written page reports. Existing LLMs we used hallucinated frequently, making us to choose between certain good ones that had a good reason thinking.",
    },
    {
      heading: "Design & Collect Feedback :",
      body: "I believe the what the user experiences, the first came from choose college after the document is uploaded . the system did not ask this question and it had created a friction . We did iterated the design based on the feedback for several more rounds during  before finalizing the new UI.",
    },
    {
      heading: "Measure:",
      body: "We launched the beta version to do initial flow of the process to monitor any broken systems. After collectively fixing most we fully launched the version to 50+ colleges to use the tool. Based on the data and user responses we looked at building new features or pivot the whole tool.",
    },
  ],
};

export const PAPERIGHT_IMPACT_HEADING = "Impact & Learning";

export const PAPERIGHT_FLOW: CaseStudyImage[] = [
  { src: "/images/paperight-impact-learning-1.webp", alt: "Design process: Investigate, Design & Collect Feedback, Measure", width: 698, height: 408 },
  { src: "/images/paperight-impact-learning-2.webp", alt: "System architecture diagrams drawn in Eraser", width: 1584, height: 864 },
];

export const PAPERIGHT_SCREENS = {
  image: {
    src: "/images/paperight-impact-learning-3.webp",
    alt: "Select college, upload report and validation results screens with notes on the problems found",
    width: 3564,
    height: 2480,
  } satisfies CaseStudyImage,
  caption: "Problems that we identified by using it ourselves",
};

export const PAPERIGHT_SYSTEM_DESIGN = {
  heading: "System design process",
  body: "I utilized Eraser.io to architect the system design for Paperight, a transforming complex logic into streamlined visual workflows. Mapping out the data flow and architectural components for the development team to a new how the system worked. Ensuring that the transition from conceptual design to beta deployment was seamless and technically",
};

export const PAPERIGHT_UX = {
  heading: "UX Challenge: Making Complexity Invisible",
  blocks: [
    {
      heading: "The Onboarding Friction",
      body: [
        "Asking users for deep metadata (like college/faculty) after they upload a complex document created a decision fatigue and hence high drop-off. I eliminated a critical friction point that previously made users question why this now?. This strategic shift allowed the system to trigger faculty-specific processing logic from the very start of the journey, the document type detection and file validation happen instantly because the system already knows the faculty \"DNA\" it's looking for.",
      ],
    },
    {
      heading: "Structural Blindness",
      body: [
        "In cases, where the audit of a 100-page report, the AI would hallucinate and often miss. We used Semantic Chunking and Hierarchical navigation (1.1, 1.1.1)- we called it parent -child nodes",
        "Section summaries are replaced by Audit Findings. Juno highlights cross-document inconsistencies and gave suggestions(e.g., \"Page 12 claims X, but the Faculty Repo requires Y\"). The user interacts with a Navigable suggestion sections that would show what is wrong and what was missing. ( see more on Research  and how it was done)",
      ],
    },
    {
      heading: "The Traceability Void",
      body: [
        "If an agent like Juno cannot prove exactly why she identified a structural gap, the entire audit is discarded as a Black Box hallucination. To eliminate this major problem, I designed a \"Peel Back\" mode for the layers called LCE-Logical Continuity Engine. When Juno identifies a gap she asked the LCE to make a claim, the UI reveals the grounding evidence behind the logic away moved from the Agent Guessing. We transformed Juno into a forensic auditor.",
      ],
    },
  ],
};

export const PAPERIGHT_FEEDBACK = {
  heading: "Feedback",
  subheading: "Talking to actual user - The students",
  intro:
    "We began conducting interviews with users across 3 colleges in Kathmandu, Nepal including Deerwalk Institute of technology(the pilot product launched), ASCOT (A college of Tribhuvan University) , Sagarmatha Engineering College (one of our developers graduated from)",
  items: [
    { quote: "The centralized dashboard allowed me to organize my modules instantly.", author: "Student #1" },
    { quote: "The built-in template followed the BSCOT standards perfectly", author: "Student #2" },
    { quote: "The version control integration meant pushing updates and seeing the changes in my reports.", author: "Student #3" },
    { quote: "I had to google and click on so many links to find the latest TU formatting guidelines online .I could download a format from the Paperight's landing screen!", author: "Student #4" },
  ],
};
