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
        <Container className="py-8 sm:py-12 md:py-16 pb-0">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Book trusted services, fast.
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground">
                Real availability, transparent pricing, and vetted providers right
                to your door.
              </p>
            </div>

            {/* AI Search Bar */}
            <div className="pt-2 sm:pt-4">
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
        <Container className="py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.Icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${encodeURIComponent(category.name)}`}
                  className="group relative rounded-xl border bg-card p-4 sm:p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors" />
                  <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
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
        <Container className="py-10 sm:py-12 md:py-16">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3">How Veyya Works</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Book trusted home services in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
            {/* Step 1 */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl sm:text-4xl font-bold text-primary-foreground">1</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Search & Browse</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Find verified providers for beauty, pet care, cleaning, and wellness services near you
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl sm:text-4xl font-bold text-primary-foreground">2</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Book Instantly</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                See real-time availability, transparent pricing, and book your preferred time slot in seconds
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-6"></div>
                <div className="relative w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl sm:text-4xl font-bold text-primary-foreground">3</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Enjoy & Review</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get premium service at home, pay securely, and share your experience with the community
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 px-4 sm:px-0">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Booking Now
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Collaborations - Beauty, Healthcare & Wellness Brands */}
      <section id="brand-collaborations" className="bg-gradient-to-b from-muted/30 to-background">
        <Container className="py-10 sm:py-12 md:py-16">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold">
              Premium Partners
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Brand Collaborations</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Exclusive partnerships with world-leading beauty, healthcare & wellness brands
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-0">
            {/* Collaboration 1 - L'Oréal */}
            <Link
              href="/collaborations/loreal"
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 bg-white border-2 border-border rounded-2xl hover:shadow-2xl hover:border-primary hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-16 sm:h-20 w-full flex items-center justify-center mb-3 sm:mb-4 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop"
                  alt="L'Oréal Professional"
                  width={140}
                  height={56}
                  className="object-contain max-w-[100px] sm:max-w-[140px]"
                />
              </div>
              <h3 className="relative font-bold text-sm sm:text-base text-center group-hover:text-primary transition-colors">L'Oréal Professional</h3>
              <p className="relative text-xs sm:text-sm text-muted-foreground text-center mt-1.5">Premium hair care</p>
            </Link>

            {/* Collaboration 2 - OPI */}
            <Link
              href="/collaborations/opi"
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 bg-white border-2 border-border rounded-2xl hover:shadow-2xl hover:border-primary hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-16 sm:h-20 w-full flex items-center justify-center mb-3 sm:mb-4 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=80&fit=crop"
                  alt="OPI"
                  width={140}
                  height={56}
                  className="object-contain max-w-[100px] sm:max-w-[140px]"
                />
              </div>
              <h3 className="relative font-bold text-sm sm:text-base text-center group-hover:text-primary transition-colors">OPI</h3>
              <p className="relative text-xs sm:text-sm text-muted-foreground text-center mt-1.5">Luxury nail products</p>
            </Link>

            {[
              { href: "/collaborations/aveda", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=80&fit=crop", name: "Aveda", desc: "Plant-based wellness" },
              { href: "/collaborations/dermalogica", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=80&fit=crop", name: "Dermalogica", desc: "Professional skincare" },
              { href: "/collaborations/aromatherapy", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=80&fit=crop", name: "Aromatherapy", desc: "Wellness massage oils" },
              { href: "/collaborations/ghd", img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop", name: "ghd", desc: "Professional styling" },
              { href: "/collaborations/kerastase", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=80&fit=crop", name: "Kérastase", desc: "Luxury hair treatments" },
              { href: "/collaborations/clarins", img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=80&fit=crop", name: "Clarins", desc: "Spa-quality treatments" },
            ].map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group relative flex flex-col items-center justify-center p-6 sm:p-8 bg-white border-2 border-border rounded-2xl hover:shadow-2xl hover:border-primary hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-16 sm:h-20 w-full flex items-center justify-center mb-3 sm:mb-4 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    width={140}
                    height={56}
                    className="object-contain max-w-[100px] sm:max-w-[140px]"
                  />
                </div>
                <h3 className="relative font-bold text-sm sm:text-base text-center group-hover:text-primary transition-colors">{brand.name}</h3>
                <p className="relative text-xs sm:text-sm text-muted-foreground text-center mt-1.5">{brand.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Bundled Voucher Marquee */}
      <section className="bg-white">
        <Container className="py-8 sm:py-10">
          <div className="text-center mb-6 px-4 sm:px-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Exclusive Bundled Vouchers</h3>
            <p className="text-sm text-muted-foreground">Save more with our curated service packages</p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-marquee">
              {/* Voucher 1 - Beauty Bundle */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-pink-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 25%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=80&h=80&fit=crop"
                    alt="Beauty"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Beauty Complete</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Manicure + Pedicure + Facial</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿3,500</span>
                    <span className="text-xl font-bold text-pink-500 ml-2">฿2,625</span>
                  </div>
                </div>
              </div>

              {/* Voucher 2 - Hair Care Bundle */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 20%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=80&h=80&fit=crop"
                    alt="Hair"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Hair Luxury</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Cut + Color + Treatment</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿4,000</span>
                    <span className="text-xl font-bold text-blue-500 ml-2">฿3,200</span>
                  </div>
                </div>
              </div>

              {/* Voucher 3 - Wellness Bundle */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-green-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 30%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop"
                    alt="Wellness"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Wellness Week</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">4 Massages + 2 Yoga Sessions</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿5,000</span>
                    <span className="text-xl font-bold text-green-500 ml-2">฿3,500</span>
                  </div>
                </div>
              </div>

              {/* Voucher 4 - Pet Care Bundle */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-orange-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 15%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=80&h=80&fit=crop"
                    alt="Pet Care"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Pet Pamper</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Grooming + Bath + Nail Trim</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿2,000</span>
                    <span className="text-xl font-bold text-orange-500 ml-2">฿1,700</span>
                  </div>
                </div>
              </div>

              {/* Voucher 5 - Spa Day Bundle */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-purple-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 35%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&h=80&fit=crop"
                    alt="Spa"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Full Spa Day</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Massage + Facial + Body Scrub</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿6,000</span>
                    <span className="text-xl font-bold text-purple-500 ml-2">฿3,900</span>
                  </div>
                </div>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-pink-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 25%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=80&h=80&fit=crop"
                    alt="Beauty"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Beauty Complete</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Manicure + Pedicure + Facial</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿3,500</span>
                    <span className="text-xl font-bold text-pink-500 ml-2">฿2,625</span>
                  </div>
                </div>
              </div>

              <div className="min-w-[280px] sm:min-w-[320px] bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl p-5 sm:p-6 flex-shrink-0 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-400/80 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE 20%</div>
                  <Image
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=80&h=80&fit=crop"
                    alt="Hair"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">Hair Luxury</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">Cut + Color + Treatment</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground line-through">฿4,000</span>
                    <span className="text-xl font-bold text-blue-500 ml-2">฿3,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer Testimonials */}
      <section>
        <Container className="pt-10 sm:pt-12 md:pt-16 pb-0">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3">What Our Customers Say</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Join thousands of satisfied customers</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
            <div className="flex gap-4 sm:gap-6 pb-4" style={{ width: 'max-content' }}>
              {/* Testimonial 1 */}
              <div className="w-72 sm:w-80 bg-card border rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
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
              <div className="w-72 sm:w-80 bg-card border rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
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
              <div className="w-72 sm:w-80 bg-card border rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
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
              <div className="w-72 sm:w-80 bg-card border rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
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
              <div className="w-72 sm:w-80 bg-card border rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
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
        <Container className="pt-6 sm:pt-8 pb-8 sm:pb-12">
          <div className="relative overflow-hidden">
            <div className="flex gap-8 sm:gap-12 animate-marquee">
              {/* Logo 1 - TechCrunch */}
              <Link
                href="https://techcrunch.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">TechCrunch</div>
              </Link>

              {/* Logo 2 - Bangkok Post */}
              <Link
                href="https://bangkokpost.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">Bangkok Post</div>
              </Link>

              {/* Logo 3 - Forbes */}
              <Link
                href="https://forbes.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">FORBES</div>
              </Link>

              {/* Logo 4 - The Nation */}
              <Link
                href="https://nationthailand.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">The Nation</div>
              </Link>

              {/* Logo 5 - Tech in Asia */}
              <Link
                href="https://techinasia.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">Tech in Asia</div>
              </Link>

              {/* Logo 6 - VentureBeat */}
              <Link
                href="https://venturebeat.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">VentureBeat</div>
              </Link>

              {/* Duplicate for seamless loop */}
              <Link
                href="https://techcrunch.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">TechCrunch</div>
              </Link>

              <Link
                href="https://bangkokpost.com"
                target="_blank"
                className="flex items-center justify-center min-w-[120px] sm:min-w-[180px] h-16 sm:h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-lg sm:text-2xl font-bold">Bangkok Post</div>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
