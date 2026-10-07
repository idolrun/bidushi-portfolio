/** Source copy, including the original typos. */

export const INFO_BIOGRAPHY = {
  dropCap: "B",
  paragraphs: [
    "idushi Thapa is a Game and Product designer specializing in AI , Product/Game designs and Creative Direction. She works with start ups across travel, education , gig economies , non-profit industries globally .",
    "Bidushi's design practice explores essence of usability and understanding realms to bridge AI and humans with design. With creativity experimentation and creative thinking at teh center of the process. Bidushi's passion for design also gives her meticulous eye for layout , typography ,hierarchical systems and confidence with color which can nbe seen thought her work crafted carefully",
  ],
} as const;

export const INFO_RESEARCH = {
  heading: "Research",
  items: ["WIngates Ontology (ongoing)", "Fuel Management system (aviation)"],
} as const;

export const INFO_AWARDS = {
  heading: "Awards",
  year: "2023",
  lines: [
    "🏆 2nd Place - She Loves Tech Global",
    "Singapore | ROAM Travel Tech",
    "International startup competition",
  ],
  logo: {
    src: "/images/she-love-tech.webp",
    alt: "She Loves Tech",
    width: 170,
    height: 164,
  },
} as const;

export type InfoContactItem = {
  label: string;
  value: string;
  href?: string;
};

export const INFO_CONTACT = {
  heading: "Please don't hesitate to get in touch.",
  items: [
    {
      label: "Contact",
      value: "hello@bidushi.design",
      href: "mailto:hello@bidushi.design",
    },
    {
      label: "Linkedin",
      value: "hello@bidushi.design",
    },
    {
      label: "Instagram",
      value: "--yksh",
    },
  ] satisfies InfoContactItem[],
} as const;
