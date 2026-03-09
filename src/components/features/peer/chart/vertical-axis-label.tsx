export function VerticalAxisLabel() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
      <span
        className="text-xs text-neutral-400 tracking-wider -mr-1"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        Performance (%)
      </span>
    </div>
  );
}
