import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
  const results: {
    step: string;
    status: "success" | "error";
    message: string;
    details?: any;
  }[] = [];

  // Test 1: Check environment variables
  results.push({
    step: "Environment Variables",
    status: process.env.DATABASE_URL ? "success" : "error",
    message: process.env.DATABASE_URL
      ? `DATABASE_URL is set (length: ${process.env.DATABASE_URL.length} chars)`
      : "DATABASE_URL is not set"
  });

  // Test 2: Test Prisma connection
  try {
    await prisma.$connect();
    results.push({
      step: "Prisma Connection",
      status: "success",
      message: "Successfully connected to database"
    });
  } catch (error) {
    results.push({
      step: "Prisma Connection",
      status: "error",
      message: error instanceof Error ? error.message : "Unknown connection error",
      details: error instanceof Error ? error.stack : String(error)
    });
  }

  // Test 3: Test simple query
  try {
    const userCount = await prisma.user.count();
    results.push({
      step: "Database Query (User Count)",
      status: "success",
      message: `Successfully queried database. Found ${userCount} users.`
    });
  } catch (error) {
    results.push({
      step: "Database Query (User Count)",
      status: "error",
      message: error instanceof Error ? error.message : "Unknown query error",
      details: error instanceof Error ? error.stack : String(error)
    });
  }

  // Test 4: Test Prisma client info
  try {
    const prismaVersion = await prisma.$queryRaw`SELECT version()`;
    results.push({
      step: "PostgreSQL Version",
      status: "success",
      message: "Successfully retrieved database version",
      details: prismaVersion
    });
  } catch (error) {
    results.push({
      step: "PostgreSQL Version",
      status: "error",
      message: error instanceof Error ? error.message : "Unknown version query error"
    });
  }

  // Disconnect
  await prisma.$disconnect();

  const hasErrors = results.some(r => r.status === "error");

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Diagnostic</CardTitle>
          <CardDescription>Testing Prisma and PostgreSQL connectivity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border ${hasErrors ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <p className={`font-semibold ${hasErrors ? 'text-red-700' : 'text-green-700'}`}>
              {hasErrors ? '✗ Database Connection Failed' : '✓ All Tests Passed'}
            </p>
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Test Results:</h3>
            {results.map((result, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${result.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h4 className="font-semibold">{result.step}</h4>
                  <span className={`ml-auto text-xs px-2 py-1 rounded ${result.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{result.message}</p>
                {result.details && (
                  <details className="text-xs bg-muted p-3 rounded mt-2">
                    <summary className="cursor-pointer font-mono">View Details</summary>
                    <pre className="mt-2 overflow-auto max-h-40 whitespace-pre-wrap">
                      {typeof result.details === 'string'
                        ? result.details
                        : JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-4 border-t">
            <Link href="/admin-test">
              <Button variant="outline">Back to Env Test</Button>
            </Link>
            {!hasErrors && (
              <Link href="/admin">
                <Button>Try Admin Dashboard</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
