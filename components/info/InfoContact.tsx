import Link from "next/link";
import { INFO_CONTACT, type InfoContactItem } from "@/lib/info";
import { cn } from "@/lib/utils";

const valueClass =
  "m-0 w-fit text-inherit transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function ContactValue({ item }: { item: InfoContactItem }) {
  if (!item.href) {
    return <dd className="m-0">{item.value}</dd>;
  }

  if (item.href.startsWith("/")) {
    return (
      <dd className="m-0">
        <Link href={item.href} className={valueClass}>
          {item.value}
        </Link>
      </dd>
    );
  }

  return (
    <dd className="m-0">
      <a href={item.href} className={valueClass}>
        {item.value}
      </a>
    </dd>
  );
}

export function InfoContact({ className }: { className?: string }) {
  return (
    <section
      data-info-reveal
      aria-labelledby="info-contact-title"
      className={cn("min-w-0", className)}
    >
      <h2
        id="info-contact-title"
        className="m-0 font-serif text-[clamp(0.9rem,1.3vw,1.1rem)] leading-none font-normal italic"
      >
        {INFO_CONTACT.heading}
      </h2>
      <dl className="m-0 mt-[1.4rem] flex flex-col gap-[1.45rem] font-sans text-[clamp(0.75rem,0.8vw,0.8rem)] leading-[1.35] font-normal">
        {INFO_CONTACT.items.map((item) => (
          <div key={item.label} className="flex flex-col gap-[0.3rem]">
            <dt className="m-0">{item.label}</dt>
            <ContactValue item={item} />
          </div>
        ))}
      </dl>
    </section>
  );
}
