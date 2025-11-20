import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED = [
  { path: "/user", roles: ["USER", "PROVIDER", "ADMIN"] },
  { path: "/provider", roles: ["PROVIDER", "ADMIN"] },
  { path: "/admin", roles: ["ADMIN"] },
];

export async function proxy(req: NextRequest) {
  const url = new URL(req.url);

  // Allow public access to onboarding pages
  if (url.pathname.startsWith("/provider/onboarding") || url.pathname === "/providers") {
    return NextResponse.next();
  }

  const match = PROTECTED.find((p) => url.pathname.startsWith(p.path));
  if (!match) return NextResponse.next();

  const session = await auth();
  if (!session?.user) return NextResponse.redirect(new URL("/api/auth/signin", req.url));

  if (!match.roles.includes(session.user.role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/provider/:path*", "/admin/:path*"],
};
