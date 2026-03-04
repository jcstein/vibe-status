export default function Loading() {
  return (
    <div className="ocean-bg min-h-screen">
      <div className="mx-auto max-w-2xl space-y-4 px-5 py-8 sm:py-12">
        {/* Header skeleton */}
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏝️</div>
              <div>
                <div className="skeleton h-7 w-36 rounded" />
                <div className="skeleton mt-2 h-4 w-48 rounded" />
              </div>
            </div>
            <div className="skeleton h-8 w-8 rounded-xl" />
          </div>
          <div className="skeleton h-16 w-full rounded-2xl" />
        </div>

        {/* Card skeletons */}
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="card-animate rounded-2xl border border-border border-l-4 border-l-accent-gray bg-surface"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="skeleton h-2.5 w-2.5 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-4 w-24 rounded" />
                  <div className="skeleton mt-1.5 h-3 w-20 rounded" />
                </div>
                <div className="skeleton h-3 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
