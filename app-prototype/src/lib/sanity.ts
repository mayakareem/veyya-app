import { createClient, type SanityClient } from "@sanity/client";

export type ProviderDisplay = {
  name: string;
  shortBio?: string | null;
  rating?: number | null;
  basePrice?: number | null;
  categories?: string[] | null;
  nextAvailableISO?: string | null;
  heroImage?: string | null;
};

// Lazy initialization to prevent build-time errors
let client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!client) {
    try {
      client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1fzg8k1",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
        useCdn: true,
      });
    } catch (error) {
      console.error("Failed to create Sanity client:", error);
      // Return a mock client that won't crash the build
      throw new Error("Sanity client initialization failed");
    }
  }
  return client;
}

export async function getProviderDisplayByPrismaId(prismaId: string): Promise<ProviderDisplay | null> {
  try {
    const sanityClient = getClient();
    const query = `*[_type=="providerProfile" && prismaId==$pid][0]{
      name,
      shortBio,
      rating,
      basePrice,
      categories,
      nextAvailableISO,
      "heroImage": coalesce(heroImage.asset->url, null)
    }`;
    return await sanityClient.fetch(query, { pid: prismaId });
  } catch (error) {
    console.error("Failed to fetch provider from Sanity:", error);
    return null;
  }
}

export const sanityClient = { get: getClient };
