import { auth } from "@/lib/auth";

export async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

export async function requireProvider() {
  const user = await requireUser();
  if (user.role !== "PROVIDER" && user.role !== "ADMIN") {
    throw new Error("Provider role required");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new Error("Admin role required");
  }
  return user;
}
