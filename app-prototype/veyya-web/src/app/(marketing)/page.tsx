export default async function MarketingHome() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Veyya</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Book trusted services with real availability and transparent pricing.
      </p>
      <div className="mt-10">
        <a href="/search" className="underline">Start exploring providers →</a>
      </div>
    </main>
  );
}
