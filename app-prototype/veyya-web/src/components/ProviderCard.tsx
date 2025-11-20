import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProviderCardProps {
  name: string;
  rating: number;
  priceFrom: number;
  categories: string[];
  nextSlotISO: string;
  className?: string;
}

// Star rating component
const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <svg
            className="w-4 h-4 fill-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg
            className="absolute top-0 left-0 w-4 h-4 fill-yellow-400"
            viewBox="0 0 24 24"
            style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 fill-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      
      <span className="text-sm text-muted-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Format price in Thai Baht
const formatPrice = (priceInSatang: number): string => {
  const baht = priceInSatang / 100;
  return `฿${baht.toLocaleString('th-TH')}`;
};

// Format next available slot
const formatNextSlot = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `Available in ${diffInHours}h`;
  } else if (diffInHours < 48) {
    return 'Available tomorrow';
  } else {
    return `Available ${date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })}`;
  }
};

export const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  rating,
  priceFrom,
  categories,
  nextSlotISO,
  className,
}) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow cursor-pointer", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="mt-1">
              <StarRating rating={rating} />
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">
              {formatPrice(priceFrom)}
            </div>
            <div className="text-xs text-muted-foreground">from</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        {/* Next available slot */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{formatNextSlot(nextSlotISO)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
