import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { createSlot, deleteSlot } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default async function ProviderCalendarPage() {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  const slots = provider
    ? await prisma.availabilitySlot.findMany({
        where: { providerId: provider.id },
        orderBy: { start: "asc" },
      })
    : [];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Availability</h1>
        <p className="text-muted-foreground">
          Create time blocks customers can book. You can delete any slot below.
        </p>
      </div>

      {/* Create new slot */}
      <form action={createSlot} className="grid gap-3 sm:grid-cols-4 items-end">
        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Start (local)</label>
          <Input type="datetime-local" name="startISO" required />
        </div>
        <div>
          <label className="block text-sm mb-1">End (local)</label>
          <Input type="datetime-local" name="endISO" required />
        </div>
        <div className="flex gap-2">
          <Input type="number" name="capacity" min={1} max={10} defaultValue={1} className="w-24" />
          <Button type="submit">Add</Button>
        </div>
      </form>

      {/* Existing slots */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Your slots</h2>
        {slots.length === 0 && <p className="text-sm text-muted-foreground">No slots yet.</p>}
        <ul className="space-y-2">
          {slots.map((s) => (
            <li key={s.id} className="flex items-center justify-between rounded border p-3">
              <div className="text-sm">
                <div><b>Start:</b> {new Date(s.start).toLocaleString()}</div>
                <div><b>End:</b> {new Date(s.end).toLocaleString()}</div>
                <div><b>Capacity:</b> {s.capacity}</div>
              </div>
              <form action={async () => { "use server"; await deleteSlot(s.id); }}>
                <Button variant="outline">Delete</Button>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <a className="underline text-sm" href="/provider">← Back to provider dashboard</a>
    </main>
  );
}
