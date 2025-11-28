import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, Search, MessageSquare, Phone, Mail } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      category: "Booking & Payments",
      questions: [
        {
          q: "How do I book a service?",
          a: "Browse services, select your preferred provider, choose a time slot, and complete payment. You'll receive instant confirmation.",
        },
        {
          q: "Can I cancel or reschedule my booking?",
          a: "Yes! Free cancellation is available up to 12 hours before your appointment. You can reschedule anytime through your bookings page.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards, mobile wallets, and bank transfers. All payments are secure and encrypted.",
        },
      ],
    },
    {
      category: "Service Providers",
      questions: [
        {
          q: "How are providers vetted?",
          a: "All providers undergo background checks, skills verification, and ongoing quality monitoring through customer reviews.",
        },
        {
          q: "What if I'm not satisfied with the service?",
          a: "Contact us within 24 hours and we'll work to resolve the issue, including rebooking or refunds when appropriate.",
        },
      ],
    },
    {
      category: "Account & Safety",
      questions: [
        {
          q: "How do I create an account?",
          a: "Sign up using your phone number or email. We'll send you a verification code to get started.",
        },
        {
          q: "Is my personal information safe?",
          a: "Yes. We use industry-standard encryption and never share your data without consent. See our Privacy Policy for details.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border space-y-8">
          <section>
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </section>

          {faqs.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item, qIndex) => (
                  <details key={qIndex} className="group border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                      {item.q}
                      <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-6 text-center">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Available 9 AM - 8 PM</p>
                <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
              </div>

              <div className="border rounded-lg p-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">+66 123 456 789</p>
                <Button variant="outline" size="sm" className="w-full">Call Now</Button>
              </div>

              <div className="border rounded-lg p-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">24-48 hour response</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">Send Email</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
