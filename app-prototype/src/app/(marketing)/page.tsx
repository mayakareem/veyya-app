import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
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

      {/* How Veyya Works */}
      <section className="bg-muted/30">
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3">How Veyya Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book trusted home services in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-primary-foreground">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Search & Browse</h3>
              <p className="text-muted-foreground">
                Find verified providers for beauty, pet care, cleaning, and wellness services near you
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-primary-foreground">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Book Instantly</h3>
              <p className="text-muted-foreground">
                See real-time availability, transparent pricing, and book your preferred time slot in seconds
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-primary-foreground">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Enjoy & Review</h3>
              <p className="text-muted-foreground">
                Get premium service at home, pay securely, and share your experience with the community
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Booking Now
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Collaborations - Beauty, Healthcare & Wellness Brands */}
      <section className="bg-muted/20">
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3">Brand Collaborations</h2>
            <p className="text-muted-foreground">Premium beauty, healthcare & wellness partners</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Collaboration 1 - L'Oréal */}
            <Link
              href="/collaborations/loreal"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop"
                  alt="L'Oréal Professional"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">L'Oréal Professional</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Premium hair care</p>
            </Link>

            {/* Collaboration 2 - OPI */}
            <Link
              href="/collaborations/opi"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=80&fit=crop"
                  alt="OPI"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">OPI</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Luxury nail products</p>
            </Link>

            {/* Collaboration 3 - Aveda */}
            <Link
              href="/collaborations/aveda"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=80&fit=crop"
                  alt="Aveda"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">Aveda</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Plant-based wellness</p>
            </Link>

            {/* Collaboration 4 - Dermalogica */}
            <Link
              href="/collaborations/dermalogica"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=80&fit=crop"
                  alt="Dermalogica"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">Dermalogica</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Professional skincare</p>
            </Link>

            {/* Collaboration 5 - Aromatherapy Associates */}
            <Link
              href="/collaborations/aromatherapy"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=80&fit=crop"
                  alt="Aromatherapy Associates"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">Aromatherapy</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Wellness massage oils</p>
            </Link>

            {/* Collaboration 6 - ghd */}
            <Link
              href="/collaborations/ghd"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop"
                  alt="ghd"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">ghd</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Professional styling</p>
            </Link>

            {/* Collaboration 7 - Kérastase */}
            <Link
              href="/collaborations/kerastase"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=80&fit=crop"
                  alt="Kérastase"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">Kérastase</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Luxury hair treatments</p>
            </Link>

            {/* Collaboration 8 - Clarins */}
            <Link
              href="/collaborations/clarins"
              className="group flex flex-col items-center justify-center p-8 bg-white border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="h-16 w-full flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=80&fit=crop"
                  alt="Clarins"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-center">Clarins</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Spa-quality treatments</p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Customer Testimonials */}
      <section>
        <Container className="pt-16 pb-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground">Join thousands of satisfied customers</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {/* Testimonial 1 */}
              <div className="w-80 bg-card border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-muted-foreground">
                  "Amazing service! Found a pet groomer for my Golden Retriever in minutes. The booking process was seamless and the groomer was professional and caring."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold">
                    SM
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah Martinez</p>
                    <p className="text-xs text-muted-foreground">Bangkok</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="w-80 bg-card border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-muted-foreground">
                  "I use Veyya weekly for my nail appointments. Love that I can see real availability and prices upfront. No more back-and-forth calls!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold">
                    PK
                  </div>
                  <div>
                    <p className="font-medium text-sm">Preeti Kapoor</p>
                    <p className="text-xs text-muted-foreground">Sukhumvit</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="w-80 bg-card border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-muted-foreground">
                  "Veyya made finding a reliable house cleaner so easy. Transparent pricing, vetted providers, and the quality has been consistently excellent."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold">
                    JL
                  </div>
                  <div>
                    <p className="font-medium text-sm">James Liu</p>
                    <p className="text-xs text-muted-foreground">Silom</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="w-80 bg-card border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-muted-foreground">
                  "As a busy professional, Veyya has been a lifesaver. From haircuts to massage therapy, everything I need comes to me. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold">
                    AN
                  </div>
                  <div>
                    <p className="font-medium text-sm">Araya Nakamura</p>
                    <p className="text-xs text-muted-foreground">Thonglor</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="w-80 bg-card border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-muted-foreground">
                  "The verification process gives me peace of mind. I know I'm booking qualified professionals every time. Plus, the customer service is top-notch!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold">
                    MC
                  </div>
                  <div>
                    <p className="font-medium text-sm">Maria Chen</p>
                    <p className="text-xs text-muted-foreground">Sathorn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Press & Media - Simple Marquee */}
      <section className="bg-muted/20">
        <Container className="pt-8 pb-12">
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-marquee">
              {/* Logo 1 - TechCrunch */}
              <Link
                href="https://techcrunch.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">TechCrunch</div>
              </Link>

              {/* Logo 2 - Bangkok Post */}
              <Link
                href="https://bangkokpost.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">Bangkok Post</div>
              </Link>

              {/* Logo 3 - Forbes */}
              <Link
                href="https://forbes.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">FORBES</div>
              </Link>

              {/* Logo 4 - The Nation */}
              <Link
                href="https://nationthailand.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">The Nation</div>
              </Link>

              {/* Logo 5 - Tech in Asia */}
              <Link
                href="https://techinasia.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">Tech in Asia</div>
              </Link>

              {/* Logo 6 - VentureBeat */}
              <Link
                href="https://venturebeat.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">VentureBeat</div>
              </Link>

              {/* Duplicate for seamless loop */}
              <Link
                href="https://techcrunch.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">TechCrunch</div>
              </Link>

              <Link
                href="https://bangkokpost.com"
                target="_blank"
                className="flex items-center justify-center min-w-[180px] h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-2xl font-bold">Bangkok Post</div>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
