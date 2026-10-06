import { OtherWorksSection } from "@/components/works/other/OtherWorksSection";
import { VahaanSection } from "@/components/works/vahaan/VahaanSection";
import { WorksChrome } from "@/components/works/WorksChrome";
import { ScrollToHash } from "@/components/works/ScrollToHash";
import { WorksSection } from "@/components/works/WorksSection";

export default function Home() {
  return (
    <>
      <WorksSection />
      <VahaanSection />
      <OtherWorksSection />
      <WorksChrome />
      <ScrollToHash />
    </>
  );
}
