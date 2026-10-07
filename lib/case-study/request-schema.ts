import { z } from "zod";

export const caseStudyRequestSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().optional(),
});

export type CaseStudyRequestInput = z.infer<typeof caseStudyRequestSchema>;
