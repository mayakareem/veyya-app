"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Clock, User, CheckCircle2 } from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  durationMin: number;
  provider: {
    id: string;
    displayName: string;
    rating: number | null;
    imageUrl: string | null;
    shortBio: string | null;
  };
};

export default function ServiceDetailCard({ service }: { service: Service }) {
  // Generate placeholder image based on service title
  const getServiceImage = (title: string) => {
    const imageMap: Record<string, string> = {
      "Deep Tissue Massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      "Thai Massage": "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
      "Aromatherapy Session": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      "Swedish Massage": "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80",
      "Hot Stone Massage": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
    };
    return imageMap[title] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80";
  };

  // Get service details based on title
  const getServiceDetails = (title: string) => {
    const detailsMap: Record<string, { benefits: string[]; technique: string }> = {
      "Deep Tissue Massage": {
        benefits: [
          "Relieves chronic muscle tension",
          "Improves range of motion",
          "Reduces inflammation",
          "Alleviates lower back pain",
        ],
        technique: "Uses slow, deep strokes and firm pressure to reach deeper layers of muscle and fascia. Focuses on areas of pain and tension.",
      },
      "Thai Massage": {
        benefits: [
          "Increases flexibility",
          "Improves circulation",
          "Boosts energy levels",
          "Reduces stress and anxiety",
        ],
        technique: "Combines acupressure, Indian Ayurvedic principles, and assisted yoga postures. Performed on a mat on the floor with client fully clothed.",
      },
      "Aromatherapy Session": {
        benefits: [
          "Promotes relaxation",
          "Reduces stress and anxiety",
          "Enhances mood",
          "Improves sleep quality",
        ],
        technique: "Uses essential oils combined with gentle massage techniques. Oils are selected based on your specific needs and preferences.",
      },
      "Swedish Massage": {
        benefits: [
          "Full body relaxation",
          "Improves blood circulation",
          "Eases muscle tension",
          "Promotes better sleep",
        ],
        technique: "Uses long, flowing strokes with light to medium pressure. The most common and well-known type of massage therapy.",
      },
      "Hot Stone Massage": {
        benefits: [
          "Deep muscle relaxation",
          "Relieves pain and stiffness",
          "Improves circulation",
          "Reduces stress",
        ],
        technique: "Heated smooth stones are placed on specific points on the body and used as massage tools. The heat helps muscles relax more deeply.",
      },
    };
    return detailsMap[title] || {
      benefits: ["Promotes relaxation", "Reduces stress", "Improves well-being"],
      technique: "Professional massage therapy tailored to your needs.",
    };
  };

  const details = getServiceDetails(service.title);
  const imageUrl = getServiceImage(service.title);

  return (
    <div className="border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow">
      {/* Service Image */}
      <div className="relative h-48 bg-muted">
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          ${(service.price / 100).toFixed(2)}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6 space-y-4">
        {/* Provider Info */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            {service.provider.imageUrl ? (
              <img
                src={service.provider.imageUrl}
                alt={service.provider.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{service.provider.displayName}</h3>
            {service.provider.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{service.provider.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{service.durationMin} minutes session</span>
        </div>

        {/* Description */}
        {service.description && (
          <p className="text-sm text-muted-foreground">{service.description}</p>
        )}

        {/* Technique */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Technique</h4>
          <p className="text-sm text-muted-foreground">{details.technique}</p>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Benefits</h4>
          <ul className="space-y-1">
            {details.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Provider Bio */}
        {service.provider.shortBio && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground italic">
              "{service.provider.shortBio}"
            </p>
          </div>
        )}

        {/* Book Button */}
        <Link href={`/providers/${service.provider.id}`} className="block">
          <Button className="w-full" size="lg">
            Book with {service.provider.displayName}
          </Button>
        </Link>
      </div>
    </div>
  );
}
