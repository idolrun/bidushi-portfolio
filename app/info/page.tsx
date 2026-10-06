import type { Metadata } from "next";
import { InfoPage } from "@/components/info/InfoPage";

export const metadata: Metadata = {
  title: "Info | YKSH",
  description: "Biography, research, awards, and contact for Bidushi Thapa.",
};

export default function InfoRoute() {
  return <InfoPage />;
}
