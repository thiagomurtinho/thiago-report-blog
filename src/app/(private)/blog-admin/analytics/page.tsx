export default function BlogAdminPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">You have no Analytics</h3>
          <p className="text-sm text-muted-foreground">
            You can start see comments as soon as you add a post.
          </p>
        </div>
      </div>
    </>
  )
}
