/** Caption printed in the empty strip at the bottom of a polaroid-style card. */
export function CardTitle({ children }: { children: string }) {
  return (
    <p className="pointer-events-none absolute bottom-[9%] left-[4.5%] m-0 font-sans text-[max(0.6rem,3.2cqw)] leading-none font-medium text-[#0E0E10]">
      {children}
    </p>
  );
}
