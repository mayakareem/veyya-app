import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function UserDashboard() {
  const session = await auth();
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Welcome, {session?.user?.name || "Guest"}</h1>
      <div className="mt-6 grid gap-4">
        <Link className="underline" href="/search">Find providers →</Link>
        <Link className="underline" href="/user/bookings">Your bookings →</Link>
      </div>
    </main>
  );
}
