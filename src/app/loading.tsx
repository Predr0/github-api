export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        
        {/* Skeleton do Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800">
          <div className="w-32 h-32 rounded-full bg-slate-800" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-4 bg-slate-800 rounded w-full" />
          </div>
        </div>

        {/* Skeleton dos Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-900 rounded-xl border border-slate-800" />
          ))}
        </div>
        
      </div>
    </main>
  );
}