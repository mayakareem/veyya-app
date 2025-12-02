"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Shield,
  Calendar,
  DollarSign,
  Target,
  AlertCircle,
  Sparkles,
  Hand,
  Scissors,
  Palette,
  HeartPulse,
  Dumbbell,
  PawPrint,
  SprayCan,
} from "lucide-react";

interface Module {
  name: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  objectives: string[];
  prerequisites?: string[];
  certificateValidity: string;
}

interface Testimonial {
  name: string;
  service: string;
  rating: number;
  text: string;
  earningsIncrease: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CategoryData {
  name: string;
  iconName: string;
  slug: string;
  description: string;
  heroDescription: string;
  benefits: string[];
  modules: Module[];
  faqs: FAQ[];
  testimonials: Testimonial[];
}

interface Props {
  category: CategoryData;
}

// Icon mapping
const iconMap: Record<string, any> = {
  Sparkles,
  Hand,
  Scissors,
  Palette,
  HeartPulse,
  Dumbbell,
  PawPrint,
  SprayCan,
};

export default function CertificationCategoryClient({ category }: Props) {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const Icon = iconMap[category.iconName] || Sparkles;

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const formatPrice = (price: number) => {
    return `฿${price.toLocaleString()}`;
  };

  return (
    <>
      <ProviderHeader />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <Container className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/providers/certifications"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
                Back to All Certifications
              </Link>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {category.name} Certification
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  {category.heroDescription}
                </p>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {category.modules.length} Modules
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Self-Paced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium">Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="border-b">
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Why Get Certified in {category.name}?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {category.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-background border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Modules Section */}
        <section className="border-b">
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Certification Modules
                </h2>
                <p className="text-lg text-muted-foreground">
                  Complete individual modules at your own pace or pursue
                  multiple certifications
                </p>
              </div>

              <div className="space-y-6">
                {category.modules.map((module, index) => {
                  const isExpanded = expandedModules.includes(index);

                  return (
                    <div
                      key={index}
                      className="bg-background border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="p-6">
                        {/* Module Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold">
                                {module.name}
                              </h3>
                              <span
                                className={`text-xs px-3 py-1 rounded-full border ${getLevelColor(
                                  module.level
                                )}`}
                              >
                                {module.level}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {module.description}
                            </p>
                          </div>
                        </div>

                        {/* Module Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-semibold">
                              {formatPrice(module.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>Valid {module.certificateValidity}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>Certified</span>
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <button
                          onClick={() => toggleModule(index)}
                          className="w-full flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {isExpanded
                              ? "Hide Details"
                              : "View Learning Objectives & Details"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="mt-6 space-y-6 border-t pt-6">
                            {/* Learning Objectives */}
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5 text-primary" />
                                <h4 className="font-semibold">
                                  Learning Objectives
                                </h4>
                              </div>
                              <ul className="space-y-2 ml-7">
                                {module.objectives.map((objective, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Prerequisites */}
                            {module.prerequisites &&
                              module.prerequisites.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-semibold">
                                      Prerequisites
                                    </h4>
                                  </div>
                                  <ul className="space-y-2 ml-7">
                                    {module.prerequisites.map((prereq, idx) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-muted-foreground"
                                      >
                                        • {prereq}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                            {/* Enroll Button */}
                            <div className="pt-4">
                              <Link href="/providers/onboarding">
                                <Button size="lg" className="w-full gap-2">
                                  <GraduationCap className="w-5 h-5" />
                                  Enroll in {module.name} -{" "}
                                  {formatPrice(module.price)}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bundle CTA */}
              <div className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">
                  Complete Certification Bundle
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Enroll in all {category.modules.length} {category.name}{" "}
                  modules and save 20%. Become a fully certified specialist and
                  maximize your earning potential.
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(
                      Math.round(
                        category.modules.reduce(
                          (sum, module) => sum + module.price,
                          0
                        ) * 0.8
                      )
                    )}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(
                      category.modules.reduce(
                        (sum, module) => sum + module.price,
                        0
                      )
                    )}
                  </span>
                  <span className="text-sm font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    Save 20%
                  </span>
                </div>
                <Link href="/providers/onboarding">
                  <Button size="lg" className="gap-2">
                    <Award className="w-5 h-5" />
                    Enroll in Complete Bundle
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section className="border-b bg-muted/30">
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  Success Stories from Certified Providers
                </h2>
                <p className="text-lg text-muted-foreground">
                  See how {category.name} certifications transformed careers
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-background border rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>

                    <p className="text-sm mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="font-semibold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.service}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {testimonial.earningsIncrease}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Earnings
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="border-b">
          <Container className="py-16">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about {category.name} certifications
                </p>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, index) => {
                  const isExpanded = expandedFaqs.includes(index);

                  return (
                    <div
                      key={index}
                      className="bg-background border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                      >
                        <span className="font-semibold pr-8">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-6 text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section>
          <Container className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-12">
                <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Certified?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Join thousands of certified {category.name} professionals
                  earning more and building thriving careers. Start your
                  certification journey today.
                </p>
                <Link href="/providers/onboarding">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 text-lg px-8"
                  >
                    <GraduationCap className="w-6 h-6" />
                    Start Your Certification
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    1,000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Certified Providers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    4.9/5
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Course Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    +45%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Earnings Increase
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
