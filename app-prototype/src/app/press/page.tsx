import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Newspaper, Download, Mail } from "lucide-react";

export default function PressPage() {
  const pressReleases = [
    {
      title: "Veyya Launches Premium Home Services Marketplace in Bangkok",
      date: "November 2025",
      description: "New platform connects customers with vetted beauty, wellness, and pet care professionals.",
    },
    {
      title: "Veyya Raises Seed Funding to Expand Across Southeast Asia",
      date: "October 2025",
      description: "Investment will fuel growth into UAE and Singapore markets in 2026.",
    },
    {
      title: "Veyya Partners with 500+ Verified Service Providers",
      date: "September 2025",
      description: "Platform reaches milestone of 500 verified professionals across 8 service categories.",
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest news, press releases, and media resources
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold mb-1">{release.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{release.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{release.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Media Kit</h2>
            <p className="text-muted-foreground mb-4">
              Download our media kit for logos, brand guidelines, product screenshots, and executive headshots.
            </p>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Media Kit
            </Button>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-4">
              For press inquiries, interviews, or additional information, please contact our media team.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:press@veyya.com" className="text-primary hover:underline">
                press@veyya.com
              </a>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-6">
            <h3 className="font-semibold mb-2">About Veyya</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Veyya is a premium home services marketplace connecting customers with verified professionals for beauty, wellness, pet care, cleaning, and fitness services. Founded in Bangkok in 2024, Veyya is transforming how people access quality services with transparent pricing, real-time availability, and a curated network of trusted providers. The platform operates in Thailand with plans to expand across Southeast Asia and the UAE.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
