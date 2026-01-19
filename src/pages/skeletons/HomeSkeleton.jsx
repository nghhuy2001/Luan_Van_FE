const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const SectionSkeleton = () => (
  <div className="mt-10">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-7 w-44" />
      <div className="hidden md:flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>

    {/* Banner + products */}
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3">
        <Skeleton className="h-72 w-full" />
      </div>

      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-3">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-4 w-5/6 mt-3" />
              <Skeleton className="h-4 w-2/3 mt-2" />
              <Skeleton className="h-6 w-1/2 mt-3" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function HomeSkeleton() {
  return (
    <>
      {/* Banner skeleton */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>

      <div className="content-body max-w-7xl mx-auto px-4">
        {/* CategoryQuickSelect skeleton */}
        <div className="mt-6 bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>

        {/* Brand sections skeleton */}
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </>
  );
}
