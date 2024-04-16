export function JournalCardSkeleton() {
  return (
    <div className="relative my-2 min-h-36 rounded-md border bg-slate-50 p-1">
      <h1 className="h-5 w-2/5 animate-pulse rounded-md bg-slate-300"></h1>
      <div className="my-1 h-5 animate-pulse rounded-md bg-slate-300 text-gray-500"></div>
      <div className="my-1 border-t-2"></div>
      <div data-publisher-policy className="text-gray-500">
        <div className="my-1 h-5 animate-pulse overflow-hidden text-ellipsis text-nowrap rounded-md bg-slate-300 text-gray-500" />
      </div>
      <div className="absolute bottom-1 right-1">
        <button
          className={`h-5 w-24 animate-pulse  rounded-md border bg-slate-300 px-2 text-sm`}
        ></button>
      </div>
    </div>
  )
}
