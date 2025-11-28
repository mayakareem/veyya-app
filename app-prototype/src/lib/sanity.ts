import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1fzg8k1",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});

export type ProviderDisplay = {
  name: string;
  shortBio?: string | null;
  rating?: number | null;
  basePrice?: number | null;
  categories?: string[] | null;
  nextAvailableISO?: string | null;
  heroImage?: string | null;
};

export async function getProviderDisplayByPrismaId(prismaId: string): Promise<ProviderDisplay | null> {
  const query = `*[_type=="providerProfile" && prismaId==$pid][0]{
    name,
    shortBio,
    rating,
    basePrice,
    categories,
    nextAvailableISO,
    "heroImage": coalesce(heroImage.asset->url, null)
  }`;
  return client.fetch(query, { pid: prismaId });
}

export { client as sanityClient };
