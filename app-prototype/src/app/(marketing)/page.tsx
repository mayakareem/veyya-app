import Container from "@/components/layout/Container";
import Link from "next/link";
import AISearchBar from "@/components/search/AISearchBar";
import PopularServices from "@/components/home/PopularServices";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";

export default function MarketingHome() {
  return (
    <main>
      {/* Hero Section with Tagline */}
      <section className="relative">
        <Container className="py-12 md:py-16 pb-0">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Book trusted services, fast.
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Real availability, transparent pricing, and vetted providers right
                to your door.
              </p>
            </div>

            {/* AI Search Bar */}
            <div className="pt-4">
              <AISearchBar />
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Services - Scrollable Circles */}
      <section className="bg-muted/20">
        <Container className="py-6">
          <PopularServices />
        </Container>
      </section>

      {/* Categories Section */}
      <section>
        <Container className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.Icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${encodeURIComponent(category.name)}`}
                  className="group relative rounded-xl border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <Icon className="w-10 h-10 mb-3 text-foreground group-hover:text-primary transition-colors" />
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        {/* Trust logos / value props / how it works */}
      </Container>
    </main>
  );
}
