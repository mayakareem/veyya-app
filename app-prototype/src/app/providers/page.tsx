import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  CreditCard,
  Calendar,
  Users,
  GraduationCap,
  Award,
  TrendingUp as Growth,
  Target,
  Star,
  DollarSign,
  Clock,
  BarChart,
  MessageCircle,
  Lightbulb
} from "lucide-react";

export default function ProvidersLandingPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Grow Your Income",
      description: "Keep 70-75% of every booking. Top providers earn ฿80,000+ per month",
      highlight: "฿80,000+ potential"
    },
    {
      icon: Shield,
      title: "Verified Customers Only",
      description: "Work only with verified clients for your safety and peace of mind"
    },
    {
      icon: CreditCard,
      title: "Guaranteed Weekly Payouts",
      description: "Transparent, timely payments every Monday directly to your account"
    },
    {
      icon: Calendar,
      title: "100% Flexible Schedule",
      description: "You're in control. Accept bookings that work for your schedule"
    },
    {
      icon: GraduationCap,
      title: "Veyya Academy",
      description: "Free training, certifications, and skill development programs",
      highlight: "Free certifications"
    },
    {
      icon: Award,
      title: "Excellence Rewards",
      description: "Top-rated providers get promotions, bonuses, and priority bookings"
    },
  ];

  const academyPrograms = [
    {
      icon: GraduationCap,
      title: "Professional Certifications",
      description: "Earn recognized certifications in your service category. Show the Veyya Verified badge on your profile.",
      features: [
        "Free certification courses",
        "Veyya Verified badge",
        "Industry-recognized credentials"
      ]
    },
    {
      icon: Target,
      title: "Skill Development",
      description: "Master new techniques, tools, and customer service excellence.",
      features: [
        "Advanced techniques training",
        "Latest tools & products",
        "Customer service mastery"
      ]
    },
    {
      icon: Growth,
      title: "Business Growth",
      description: "Learn pricing strategies, marketing, and how to build your reputation.",
      features: [
        "Pricing optimization",
        "Profile marketing tips",
        "Reputation building"
      ]
    },
    {
      icon: Star,
      title: "Veyya Verified Badge",
      description: "Stand out with our prestigious badge. Certified providers earn 35% more on average.",
      features: [
        "35% higher earnings",
        "Priority in search results",
        "Customer trust boost"
      ]
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: "Provider Community",
      description: "Connect with 1,000+ providers, share tips, and grow together"
    },
    {
      icon: Lightbulb,
      title: "Mentorship Program",
      description: "Learn from experienced providers and get personalized guidance"
    },
    {
      icon: BarChart,
      title: "Performance Insights",
      description: "Track your earnings, ratings, and booking trends with detailed analytics"
    },
    {
      icon: MessageCircle,
      title: "Priority Support",
      description: "24/7 dedicated provider support team to help you succeed"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up & Complete Profile",
      description: "Fill out your application with services, experience, and availability",
      duration: "15 min"
    },
    {
      number: 2,
      title: "Verification & Training",
      description: "Complete background check and Veyya Academy orientation",
      duration: "2-3 days"
    },
    {
      number: 3,
      title: "Get Approved & Go Live",
      description: "Receive approval and activate your provider profile",
      duration: "1 day"
    },
    {
      number: 4,
      title: "Receive Bookings & Get Paid",
      description: "Start accepting bookings and earning with weekly payouts",
      duration: "Ongoing"
    }
  ];

  return (
    <>
      <ProviderHeader />
      <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-primary/3 to-background">
        <Container className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Join 1,000+ trusted providers
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Build Your Business on Your Own Terms
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join Veyya and connect with thousands of verified customers. Earn more, grow your skills,
              and build your reputation on Thailand's most trusted service platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1,000+</div>
                <div className="text-sm text-muted-foreground">Active Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">฿5.2M</div>
                <div className="text-sm text-muted-foreground">Paid Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4.8★</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/providers/onboarding">
                <Button size="lg" className="text-lg px-10 py-6 gap-2">
                  Start Earning Today
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section>
        <Container className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Partner with Veyya?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed and grow your service business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      {benefit.highlight && (
                        <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mb-2">
                          {benefit.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Veyya Academy Section */}
      <section className="bg-gradient-to-b from-background to-primary/5">
        <Container className="py-12 md:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Veyya Academy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upskill Yourself & Earn More
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free training programs, professional certifications, and business growth resources
              to help you become a top-rated provider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {academyPrograms.map((program) => {
              const Icon = program.icon;
              return (
                <div key={program.title} className="bg-card border rounded-2xl p-8 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                      <p className="text-muted-foreground">{program.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Certified Providers Earn 35% More
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Complete Veyya Academy courses to earn your Veyya Verified badge,
              rank higher in search results, and attract premium customers
            </p>
            <Link href="/providers/onboarding">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                Start Your Journey
                <Award className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Community & Support Section */}
      <section>
        <Container className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join a Thriving Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You're never alone. Connect with fellow providers, get support, and grow together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30">
        <Container className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              How to Get Started
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              4 simple steps to start earning with Veyya
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-muted z-0" />
                  )}

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-primary font-medium">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/providers/onboarding">
                <Button size="lg" className="text-lg px-10 py-6 gap-2">
                  Begin Application
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Requirements Section */}
      <section className="bg-muted/30">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What You'll Need
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Valid Thai National ID or Work Permit</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Business registration documents (for registered businesses)</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Professional certifications or licenses (if applicable)</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Bank account information for payments</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Profile photo and service portfolio images</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> All information is kept confidential and secure. We comply with Thailand's Personal Data Protection Act (PDPA) and industry best practices for data security.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <Container className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 1,000+ providers who are already earning more, growing their skills,
              and building successful businesses with Veyya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/providers/onboarding">
                <Button size="lg" className="text-lg px-12 py-7 gap-2">
                  Start Your Application
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/provider/faq">
                <Button size="lg" variant="outline" className="text-lg px-12 py-7">
                  View FAQ
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Free to join • No upfront costs • Flexible schedule • Weekly payouts
            </p>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}
