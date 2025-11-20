"use client";

import Image from "next/image";
import Link from "next/link";
import { getServiceImage } from "@/lib/utils/serviceImages";

type PopularService = {
  name: string;
  category: string;
  price: number;
};

const POPULAR_SERVICES: PopularService[] = [
  { name: "Deep Tissue Massage", category: "Wellness", price: 1200 },
  { name: "Gel Manicure", category: "Nails", price: 500 },
  { name: "Women's Haircut", category: "Hair", price: 500 },
  { name: "Bridal Makeup", category: "Makeup", price: 3500 },
  { name: "Classic Facial", category: "Beauty", price: 800 },
  { name: "Dog Grooming", category: "Pet Care", price: 1200 },
  { name: "Deep Cleaning - Medium", category: "Cleaning", price: 3500 },
  { name: "Personal Training", category: "Fitness", price: 1500 },
  { name: "Thai Massage - 60min", category: "Wellness", price: 1000 },
  { name: "Balayage", category: "Hair", price: 3500 },
  { name: "Spa Pedicure", category: "Nails", price: 900 },
  { name: "Yoga Class - Beginner", category: "Fitness", price: 600 },
];

export default function PopularServices() {
  return (
    <div className="w-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Popular Services</h2>
        <p className="text-sm text-muted-foreground">Quick access to trending services</p>
      </div>

      <div className="relative">
        {/* Scrollable container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {POPULAR_SERVICES.map((service) => {
            const imageUrl = getServiceImage(service.name, service.category);

            return (
              <Link
                key={service.name}
                href={`/category/${encodeURIComponent(service.category)}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="flex flex-col items-center gap-2 w-28">
                  {/* Circular Image */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all shadow-md group-hover:shadow-lg">
                    <Image
                      src={imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Price Badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/95 text-white text-xs font-semibold py-1 text-center">
                      ฿{service.price}
                    </div>
                  </div>

                  {/* Service Name */}
                  <div className="text-center">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
