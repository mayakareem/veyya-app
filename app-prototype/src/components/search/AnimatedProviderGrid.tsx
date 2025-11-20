import ProviderGrid from "@/components/ProviderGrid";

type Provider = {
  id: string;
  displayName: string;
  rating: number | null;
  basePrice: number | null;
  shortBio: string | null;
  categories: string[];
  services: { title: string; price: number; id: string }[];
  _count: { services: number; bookings: number };
  imageUrl?: string | null;
  availability?: { start: Date; capacity: number }[];
};

type Props = {
  providers: Provider[];
};

export default function AnimatedProviderGrid({ providers }: Props) {
  if (providers.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        No providers found. Try adjusting your filters.
      </div>
    );
  }

  return <ProviderGrid providers={providers} />;
}
