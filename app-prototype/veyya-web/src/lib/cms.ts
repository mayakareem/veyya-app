import { createClient } from "@sanity/client";

export type Provider = {
  id: string;
  name: string;
  rating?: number;
  basePrice?: number;
  categories?: string[];
  nextAvailableISO?: string | null;
  heroImage?: string | null;
  shortBio?: string | null;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
  // token: process.env.SANITY_READ_TOKEN, // uncomment if dataset is private
});

export async function listProviders(): Promise<Provider[]> {
  const query = `*[_type=="providerProfile"]{
    "id": _id, name, rating, basePrice, categories, nextAvailableISO,
    "heroImage": heroImage.asset->url, shortBio
  }[0...50]`;
  return client.fetch(query);
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const query = `*[_type=="providerProfile" && _id==$id][0]{
    "id": _id, name, rating, basePrice, categories, nextAvailableISO,
    "heroImage": heroImage.asset->url, shortBio
  }`;
  return client.fetch(query, { id });
}
