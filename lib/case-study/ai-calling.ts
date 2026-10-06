import type { RailTocItem } from "@/components/ui/rail-toc";
import type { CaseStudyImage, CaseStudyPhone } from "@/lib/case-study/shared";

export const AI_CALLING_TOC: RailTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "research", label: "Research" },
  { id: "impact", label: "Impact & Learning" },
  { id: "outcomes", label: "Learning Outcomes" },
];

export const AI_CALLING_HERO = {
  title: "AI-Calling Tool for Recruiters",
  subtitle: "How AI lead curation and tracking eliminated manual chaos",
  phones: [
    { src: "/images/ai_calling_mobile_1.webp", alt: "AI Calling splash screen with AI curated lists", width: 532, height: 1096 },
    { src: "/images/ai_calling_mobile_2.webp", alt: "Hotline home with punch in, SmartList and call performance", width: 532, height: 1096 },
  ] satisfies CaseStudyPhone[],
};

export const AI_CALLING_PROBLEM = {
  heading: "The Problem",
  paragraphs: [
    "Vahan.ai (YC19)  had another problem their partner Vahan Leaders ran recruitment agencies across India but where piled with fake leads. The auto calling internal AI analytical tool \"Samvadhani\" was hallucinating with these leads and wasting  recruiters time on numbers that didn't exist.",
    "We saw  these agencies had thousands of outdated excel sheets working manually .No tracking , No record of conversations, No systematic follow-ups. The conversion rate was at 8% were recruiters were calling without prioritization.",
  ],
};

export const AI_CALLING_RESEARCH = {
  heading: "10,000 Rows, Zero System-the manual chaos costing 40% productivity",
  intro:
    "We headed over to one of the recruiters office his name was Austin to understand the chaos. It was an Excel epidemic.We helped solved the endless rows scanning under 5 mins and generated genuine leads to one agency and replicated across others in the country.",
  blocks: [
    {
      heading: "The AI Campaign Curation",
      body: "Agencies gave a list and the recruiter were supposed to hit targets. The hotline curation would find proximity on leads, vehicle ownership with License and Aadhar cards. Then categorized into hierarchal system of high( 80-100) , medium(50-79) and low (0-49) priority this eliminated fake leads and focused on time and high conversion.",
    },
    {
      heading: "Call Tracking System",
      body: "Every call made was logged into the the campaign that was running. It would automatically check 1. Who was called 2. When they were called 3.Duration 4. Conversation and Notes taken 5.Conversion outcome (interested/not /maybe) 6. Follow ups scheduled. No more excel chaos all in one system.",
    },
    {
      heading: "Intelligent Follow Up",
      body: "The system was deigned to help recruiters not forget and miss any potential lead and an automatic reminder feature was added. \"Today\"with follow ups and notes on lead was stored. Overdue or missed would show up in which campaigns where chosen. Conversation history was also visible when follow ups. This insured that recruiters could pick up exactly where they left off.",
    },
  ],
};

export const AI_CALLING_IMPACT_HEADING = "Impact & Learning";

export const AI_CALLING_SCREENS_TOP: CaseStudyImage[] = [
  { src: "/images/hotline_home.webp", alt: "Hotline home with punch in and a day's mini performance", width: 386, height: 334, caption: "Hotline Home" },
  { src: "/images/running_a_campagin.webp", alt: "Campaigns, SmartList and RnR SmartList screens", width: 1001, height: 425, caption: "Running a Campaign" },
];

export const AI_CALLING_SCREENS_BOTTOM: CaseStudyImage[] = [
  { src: "/images/leads.webp", alt: "Leads list and client filter pop-up", width: 614, height: 459, caption: "Leads" },
  { src: "/images/calling_whatsapp.webp", alt: "Auto dialing, WhatsApp message and interested-lead screens", width: 1174, height: 559, caption: "Calling/WhatsApp" },
];

export const AI_CALLING_OUTCOMES = {
  heading: "Learning Outcomes",
  items: [
    { title: "1. AI + Human Intelligence", body: "AI curated leads, humans made the call (literally)  Neither could work well alone" },
    { title: "2. Reducing Cognitive Load", body: "Recruiters had too much to remember to less time . A System that could help them remember created impact like an external brain." },
    { title: "3. Respecting Existing Workflows", body: "We didn't discard the use of Excel but integrated it side by side. Traditional mixed with new method created high conversion." },
  ],
};
