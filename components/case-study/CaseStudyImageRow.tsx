import Image from "next/image";
import { Lens } from "@/components/ui/lens";
import type { CaseStudyImage } from "@/lib/case-study/shared";

/** Widths follow aspect ratio so every screen in a row lands at the same height. */
export function CaseStudyImageRow({
  images,
  label,
  lens = false,
}: {
  images: CaseStudyImage[];
  label: string;
  /** Zoom-on-hover magnifier over each image. */
  lens?: boolean;
}) {
  return (
    <ul
      aria-label={label}
      className="m-0 grid list-none grid-cols-1 items-end gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:flex lg:items-start"
    >
      {images.map(({ src, alt, width, height, caption }) => {
        const image = (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="h-auto w-full"
          />
        );
        return (
        <li
          key={src}
          data-reveal
          className="mx-auto w-full lg:mx-0 lg:w-auto lg:min-w-0"
          style={{ flexGrow: width / height, flexBasis: 0, maxWidth: width * 1.3 }}
        >
          {caption ? (
            <p className="m-0 mb-4 flex items-center gap-3 text-[0.6875rem] text-neutral-600">
              {caption.includes("—") ? (
                <>
                  {caption.split(" — ")[0]}
                  <span aria-hidden="true" className="h-px flex-1 bg-neutral-300" />
                  {caption.split(" — ")[1]}
                </>
              ) : (
                caption
              )}
            </p>
          ) : null}
          {lens ? <Lens>{image}</Lens> : image}
        </li>
        );
      })}
    </ul>
  );
}
