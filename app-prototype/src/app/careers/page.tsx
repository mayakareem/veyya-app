import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Product Manager",
      department: "Product",
      location: "Bangkok, Thailand",
      type: "Full-time",
    },
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "Bangkok, Thailand / Remote",
      type: "Full-time",
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Bangkok, Thailand",
      type: "Full-time",
    },
    {
      title: "Customer Success Lead",
      department: "Operations",
      location: "Bangkok, Thailand",
      type: "Full-time",
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Careers at Veyya</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us in transforming the home services industry across Southeast Asia
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Work at Veyya?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Competitive salary and equity packages</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Flexible work arrangements (hybrid/remote options)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Health insurance and wellness benefits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Learning and development budget</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Fast-paced startup environment with opportunity to make an impact</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <div key={index} className="border rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-6 text-center">
            <Briefcase className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Don't see the right role?</h3>
            <p className="text-muted-foreground mb-4">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="outline">Send General Application</Button>
          </section>
        </div>
      </Container>
    </main>
  );
}
