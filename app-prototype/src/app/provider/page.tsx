import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProviderDashboard() {
  const session = await auth();
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Provider Console</h1>
      <p className="text-muted-foreground">Logged in as {session?.user?.email}</p>
      <ul className="list-disc pl-6">
        <li><a className="underline" href="/provider/onboarding">Onboarding</a></li>
        <li><a className="underline" href="/provider/services">Manage services</a></li>
        <li><a className="underline" href="/provider/calendar">Manage availability</a></li>
      </ul>
    </main>
  );
}
