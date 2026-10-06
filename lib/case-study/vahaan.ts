import type { RailTocItem } from "@/components/ui/rail-toc";
import type { CaseStudyImage } from "@/lib/case-study/shared";


export const VAHAAN_TOC: RailTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "analysis", label: "Behavior Analysis" },
  { id: "game-design", label: "Game Design" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
];

export const VAHAAN_HERO = {
  title: "THE ADOPTION PROBLEM",
  subtitle: "Engineering viral adoption through gamified rewards with behavioral design",
  phones: [
    { src: "/images/mobile_wallet_1.webp", alt: "Vahan wallet splash: Pehle din ka petrol", width: 529, height: 1091 },
    { src: "/images/wallet_mobile_2.webp", alt: "Vahan wallet challenge: win up to ₹200 on petrol", width: 538, height: 1108 },
  ],
} as const;


export const VAHAAN_PROBLEM = {
  heading: "The Problem",
  paragraphs: [
    "Vahan.ai (YC19) had a Job delivery app and wallet system but very low adoption staying at 32% after launch in 2023. It was built for gig workers(delivery) connecting with companies like Swiggy , Blinkit and Zomato across India. I had inherited a version that was clunky and not gamified. Existing wallet felt like another feature to learn and would lead to drop-off.",
    "After two months analyzing user behavior, we saw the pattern riders would sign up, look at the wallet, then never use it. CAC exceeded ₹850 and retention remained below 15% at day 7. We were asking riders to change behavior without giving them a reason to start. If we couldn't solve the barrier no amount of UI polish could drive adoption.",
  ],
};

export const VAHAAN_ANALYSIS = {
  heading: "The ₹100 That Changed Everything - A behavior analysis",
  intro:
    "As growth designer at Vahan (YC19), I transformed wallet adoption from 32% to 64 %to viral growth. I leveraged my game design degree and transformed the wallet from a payment tool into a challenge system",
  blocks: [
    {
      heading: "The Strategic Challenge",
      body: "THE ADOPTION PARADOX -We gave riders ₹100 for petrol .Adoption hit 70%. Three months later: 34%. The money wasn't the problem. The trust in the system was.",
    },
    {
      heading: "The Analysis and game mechanics",
      body: "I applied game design principles called “A Hero’s Journey” to solve friction. Money was the factor. Lesser rides completion and reward gave motivation. A rider was refresh every hour to check trips and get the job done.",
    },
  ],
};

export const VAHAAN_GAME_DESIGN = {
  principles: "Game design principles—goals, progress, rewards—solved a cold-start business problem.",
};

export const VAHAAN_VERSION_1: CaseStudyImage[] = [
  { src: "/images/version_1.webp", alt: "Version 1: job feed with testimonials", width: 302, height: 338, caption: "Version 1" },
  { src: "/images/offer_challenges.webp", alt: "Offers and challenges screens", width: 320, height: 330, caption: "Offers — Challenges" },
  { src: "/images/new_wallet.webp", alt: "New wallet and transaction history screens", width: 662, height: 451, caption: "New Wallet" },
  { src: "/images/communities_introduction.webp", alt: "WhatsApp communities introduction screen", width: 403, height: 369, caption: "Communities introduction" },
];

export const VAHAAN_VERSION_2: CaseStudyImage[] = [
  { src: "/images/version2_1.webp", alt: "Version 2: job categories screen", width: 175, height: 446, caption: "Version 2" },
  { src: "/images/version2_2.webp", alt: "Version 2: home and challenges screens", width: 528, height: 458 },
  { src: "/images/version2_3.webp", alt: "Version 2: win up to ₹200 petrol challenge screens", width: 586, height: 377 },
];

export const VAHAAN_METRICS = [
  "App jumped 34% to 64%in usage and activated referral program",
  "Evening hours saw 3x completion rate",
  "Riders completed trips 40% faster to earn reward",
];

export const VAHAAN_FEEDBACK = {
  heading: "Feedback & Impact",
  items: Array.from({ length: 4 }, () => ({
    quote:
      "Vahan is great; once you get the hang of it, after activation, it's excellent for receiving orders, timely payments, along with the best incentives and offers",
    author: "GOVINDA RAO",
  })),
};
