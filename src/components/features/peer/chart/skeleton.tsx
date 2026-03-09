export function ChartSkeleton() {
  return (
    <div className="absolute inset-0 z-10 bg-white/40 p-4 pb-6">
      <div className="w-full h-full flex flex-col animate-pulse">
        <div className="flex-1 flex flex-col justify-between border-l border-b border-gray-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-gray-100 border-dashed" />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
