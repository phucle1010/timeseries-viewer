export function EmptyChartState() {
  return (
    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex flex-col justify-between opacity-40 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-full border-t border-slate-300" />
        ))}
        <div className="absolute inset-0 flex justify-between px-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full border-l border-slate-300" />
          ))}
        </div>
      </div>
    </div>
  );
}
