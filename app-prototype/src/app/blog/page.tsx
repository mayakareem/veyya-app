import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "10 Beauty Tips for Glowing Skin This Season",
      excerpt: "Discover expert-recommended skincare routines and treatments to achieve radiant, healthy skin.",
      category: "Beauty",
      date: "November 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "The Complete Guide to Booking Home Services",
      excerpt: "Everything you need to know about finding, booking, and preparing for at-home beauty and wellness services.",
      category: "Guides",
      date: "November 10, 2025",
      readTime: "8 min read",
    },
    {
      title: "Pet Grooming 101: What Every Pet Owner Should Know",
      excerpt: "Essential tips for keeping your furry friends clean, healthy, and happy with professional grooming.",
      category: "Pet Care",
      date: "November 5, 2025",
      readTime: "6 min read",
    },
    {
      title: "Wedding Prep Timeline: Beauty & Wellness Services",
      excerpt: "A month-by-month guide to scheduling beauty treatments before your big day.",
      category: "Events",
      date: "October 28, 2025",
      readTime: "7 min read",
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <Container className="py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Veyya Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights on beauty, wellness, and home services
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-xl p-6 border hover:border-primary transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 bg-primary/10 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="outline" size="sm" className="group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Looking for more articles?</p>
          <Button variant="outline">Load More Posts</Button>
        </div>
      </Container>
    </main>
  );
}
