import Image from "next/image";
import { type Ref } from "react";
import { CardTitle } from "@/components/works/other/CardTitle";

type BookingProjectProps = {
  pageRef: Ref<HTMLDivElement>;
  hotelRef: Ref<HTMLDivElement>;
  socialRef: Ref<HTMLDivElement>;
};

/**
 * The files carry transparent padding (and a soft phone shadow) around the cream
 * card. `card` is that card inside the file, so it can be sized like the
 * illustration cards while the shadow still bleeds past its edge.
 */
const CARDS = [
  {
    key: "hotel" as const,
    title: "Hostel Booking app",
    src: "/images/otherwork-hotel-booking-app.webp",
    alt: "Hostel booking app: hostel list and hostel details screens on two phones",
    className: "other-hotel",
    file: { width: 1281, height: 1072 },
    card: { x: 112, y: 1, width: 1056, height: 1070 },
  },
  {
    key: "social" as const,
    title: "Social Media",
    src: "/images/otherwork-social-media.webp",
    alt: "TAG social app: pin map and activity screens on two phones",
    className: "other-social",
    file: { width: 1122, height: 1276 },
    card: { x: 55, y: 103, width: 1056, height: 1070 },
  },
];

export function BookingProject({ pageRef, hotelRef, socialRef }: BookingProjectProps) {
  const refs = { hotel: hotelRef, social: socialRef };

  return (
    <div ref={pageRef} className="other-scene other-booking pointer-events-none absolute inset-0 z-10">
      <div className="relative z-10 flex h-full items-center justify-center gap-[clamp(0.85rem,2.4vw,2.25rem)] px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)] max-md:flex-col max-md:gap-[clamp(0.75rem,2vh,1.25rem)]">
        {CARDS.map(({ key, title, src, alt, className, file, card }) => (
          <div
            key={key}
            ref={refs[key]}
            className={`${className} relative w-[min(40vw,28rem)] [container-type:inline-size] max-md:w-[min(33.5vh,78vw,22rem)]`}
            style={{ aspectRatio: `${card.width} / ${card.height}` }}
          >
            <Image
              src={src}
              alt={alt}
              width={file.width}
              height={file.height}
              sizes="(max-width: 767px) 95vw, 600px"
              className="pointer-events-none absolute max-w-none"
              style={{
                width: `${(file.width / card.width) * 100}%`,
                left: `${(-card.x / card.width) * 100}%`,
                top: `${(-card.y / card.height) * 100}%`,
              }}
            />
            <CardTitle>{title}</CardTitle>
          </div>
        ))}
      </div>
    </div>
  );
}
