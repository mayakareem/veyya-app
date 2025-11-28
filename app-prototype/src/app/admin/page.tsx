export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="grid gap-3">
        <a className="underline" href="/admin/providers">Providers</a>
        <a className="underline" href="/admin/bookings">Bookings</a>
        <a className="underline" href="/admin/settings">Settings</a>
      </div>
    </main>
  );
}
