import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veyya - Book Home Services",
  description: "Premium home services marketplace in Thailand",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add navigation bar here */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Veyya</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* TODO: Add footer here */}
    </div>
  );
}
