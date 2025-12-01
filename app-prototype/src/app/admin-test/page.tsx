import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminTestPage() {
  // Test if we can read environment variables
  const hasDatabase = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432");
  const hasAuthSecret = !!process.env.NEXTAUTH_SECRET;
  const hasAuthUrl = !!process.env.NEXTAUTH_URL;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard - Environment Test</CardTitle>
          <CardDescription>Testing deployment configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Environment Variables Status:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${hasDatabase ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>DATABASE_URL: {hasDatabase ? '✓ Configured' : '✗ Missing or using fallback'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${hasAuthSecret ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>NEXTAUTH_SECRET: {hasAuthSecret ? '✓ Configured' : '✗ Missing'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${hasAuthUrl ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>NEXTAUTH_URL: {hasAuthUrl ? '✓ Configured' : '✗ Missing'}</span>
              </li>
            </ul>
          </div>

          {hasDatabase && hasAuthSecret && hasAuthUrl ? (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-700 font-semibold">✓ All environment variables configured correctly</p>
              <p className="text-sm text-green-600 mt-2">
                The admin dashboard should work. If you're still seeing errors, it might be:
              </p>
              <ul className="list-disc list-inside text-sm text-green-600 mt-2 ml-4">
                <li>Database connection timeout</li>
                <li>Invalid database credentials</li>
                <li>Prisma client not generated properly</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-700 font-semibold">✗ Missing environment variables</p>
              <p className="text-sm text-red-600 mt-2">
                Please add the missing variables in Vercel settings and redeploy.
              </p>
            </div>
          )}

          <div className="pt-4 flex gap-4">
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
            <Link href="/admin">
              <Button>Go to Admin Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
