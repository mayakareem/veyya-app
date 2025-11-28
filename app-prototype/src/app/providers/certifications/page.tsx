import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  HeartPulse,
  Dumbbell,
  PawPrint,
  Scissors,
  Palette,
  Hand,
  SprayCan
} from "lucide-react";

const certificationCategories = [
  {
    name: "Beauty Services",
    icon: Sparkles,
    slug: "beauty",
    modules: [
      { name: "Facial Treatment Specialist", duration: "4 hours", level: "Intermediate" },
      { name: "Advanced Waxing Techniques", duration: "3 hours", level: "Beginner" },
      { name: "Eyebrow Threading Mastery", duration: "2 hours", level: "Beginner" },
      { name: "Eyelash Extension Professional", duration: "6 hours", level: "Advanced" },
    ]
  },
  {
    name: "Nails",
    icon: Hand,
    slug: "nails",
    modules: [
      { name: "Professional Manicure & Pedicure", duration: "3 hours", level: "Beginner" },
      { name: "Gel Nails Specialist", duration: "4 hours", level: "Intermediate" },
      { name: "Nail Art & Design", duration: "5 hours", level: "Advanced" },
      { name: "Nail Extensions Expert", duration: "6 hours", level: "Advanced" },
    ]
  },
  {
    name: "Hair Styling",
    icon: Scissors,
    slug: "hair",
    modules: [
      { name: "Professional Cutting Techniques", duration: "8 hours", level: "Intermediate" },
      { name: "Hair Coloring Fundamentals", duration: "6 hours", level: "Intermediate" },
      { name: "Balayage & Highlights Master", duration: "10 hours", level: "Advanced" },
      { name: "Hair Treatment Specialist", duration: "4 hours", level: "Beginner" },
    ]
  },
  {
    name: "Makeup Artistry",
    icon: Palette,
    slug: "makeup",
    modules: [
      { name: "Bridal Makeup Professional", duration: "8 hours", level: "Advanced" },
      { name: "Event Makeup Specialist", duration: "6 hours", level: "Intermediate" },
      { name: "Airbrush Makeup Techniques", duration: "4 hours", level: "Intermediate" },
      { name: "Makeup for Photography", duration: "5 hours", level: "Advanced" },
    ]
  },
  {
    name: "Wellness & Massage",
    icon: HeartPulse,
    slug: "wellness",
    modules: [
      { name: "Thai Massage Certified Practitioner", duration: "20 hours", level: "Intermediate" },
      { name: "Deep Tissue Massage Specialist", duration: "16 hours", level: "Advanced" },
      { name: "Swedish Massage Fundamentals", duration: "12 hours", level: "Beginner" },
      { name: "Hot Stone Massage Therapy", duration: "8 hours", level: "Intermediate" },
      { name: "Aromatherapy Specialist", duration: "10 hours", level: "Intermediate" },
    ]
  },
  {
    name: "Fitness Training",
    icon: Dumbbell,
    slug: "fitness",
    modules: [
      { name: "Certified Personal Trainer", duration: "40 hours", level: "Advanced" },
      { name: "Yoga Instructor Certification", duration: "30 hours", level: "Intermediate" },
      { name: "Pilates Instructor", duration: "25 hours", level: "Intermediate" },
      { name: "Nutrition Consultant", duration: "20 hours", level: "Intermediate" },
    ]
  },
  {
    name: "Pet Care",
    icon: PawPrint,
    slug: "pet-care",
    modules: [
      { name: "Professional Dog Grooming", duration: "16 hours", level: "Beginner" },
      { name: "Cat Grooming Specialist", duration: "12 hours", level: "Intermediate" },
      { name: "Pet First Aid & Safety", duration: "6 hours", level: "Beginner" },
      { name: "Breed-Specific Grooming", duration: "10 hours", level: "Advanced" },
    ]
  },
  {
    name: "Cleaning Services",
    icon: SprayCan,
    slug: "cleaning",
    modules: [
      { name: "Professional Cleaning Standards", duration: "6 hours", level: "Beginner" },
      { name: "Deep Cleaning Specialist", duration: "8 hours", level: "Intermediate" },
      { name: "Eco-Friendly Cleaning Methods", duration: "4 hours", level: "Beginner" },
      { name: "Commercial Cleaning Professional", duration: "12 hours", level: "Advanced" },
    ]
  },
];

export default function CertificationsPage() {
  return (
    <>
      <ProviderHeader />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* Hero Section */}
        <section className="border-b">
          <Container className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Veyya Academy Certifications
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Elevate Your Skills with Professional Certifications
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Earn industry-recognized certifications, boost your credibility, and increase your earnings by up to 35%
              </p>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-background border rounded-xl p-6">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Industry Recognized</h3>
                  <p className="text-sm text-muted-foreground">
                    Certifications recognized across Thailand and SEA
                  </p>
                </div>
                <div className="bg-background border rounded-xl p-6">
                  <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Self-Paced Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete modules at your own schedule
                  </p>
                </div>
                <div className="bg-background border rounded-xl p-6">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Earn More</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified providers earn 35% more on average
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Certification Categories */}
        <section>
          <Container className="py-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse Certification Programs</h2>
              <p className="text-lg text-muted-foreground">
                Choose from our comprehensive range of professional certification modules
              </p>
            </div>

            <div className="space-y-6">
              {certificationCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.slug} className="bg-background border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.modules.length} certification modules available
                            </p>
                          </div>
                        </div>
                        <Link href={`/providers/certifications/${category.slug}`}>
                          <Button>View Modules</Button>
                        </Link>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {category.modules.map((module, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-muted/30">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{module.name}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                module.level === "Beginner"
                                  ? "bg-green-100 text-green-700"
                                  : module.level === "Intermediate"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}>
                                {module.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{module.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <Container className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your learning journey today and join 1,000+ certified providers
              </p>
              <Link href="/providers/onboarding">
                <Button size="lg" className="gap-2">
                  <Award className="w-5 h-5" />
                  Start Provider Application
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
