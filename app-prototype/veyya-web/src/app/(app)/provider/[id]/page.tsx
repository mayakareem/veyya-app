import { getProviderById } from "@/lib/cms";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function ProviderDetail({ params }: Props) {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) {
    return <main className="p-10">Provider not found.</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold">{provider.name}</h1>
      <div className="text-sm text-muted-foreground mt-1">
        ⭐ {provider.rating.toFixed(1)} · From ${provider.basePrice} · {provider.categories.join(", ")}
      </div>
      <p className="mt-4">{provider.shortBio}</p>
      {provider.nextAvailableISO && (
        <p className="mt-2 text-sm">Next available: {new Date(provider.nextAvailableISO).toLocaleString()}</p>
      )}
      <div className="mt-6">
        <Link className="underline" href={`/booking/${provider.id}`}>Book this provider →</Link>
      </div>
    </main>
  );
}
