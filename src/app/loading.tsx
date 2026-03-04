export default function Loading() {
  return (
    <div className="dot-grid min-h-screen">
      <div className="mx-auto max-w-2xl space-y-5 px-5 py-8 sm:py-12">
        {/* Header skeleton */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="skeleton h-9 w-48 rounded" />
              <div className="skeleton mt-2 h-3 w-36 rounded" />
            </div>
            <div className="skeleton h-8 w-8 rounded-lg" />
          </div>
          <div className="skeleton h-12 w-full rounded-lg" />
        </div>

        {/* Card skeletons */}
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="card-animate rounded-lg border border-border border-l-4 border-l-accent-gray bg-surface"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="skeleton h-2.5 w-2.5 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-4 w-24 rounded" />
                  <div className="skeleton mt-1.5 h-3 w-16 rounded" />
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
